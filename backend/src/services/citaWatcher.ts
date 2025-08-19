import puppeteer, { Browser, Page } from 'puppeteer';
import * as cron from 'node-cron';
import { CitaWatcher, NotificationType, Notification } from '../types/shared';

interface AppointmentSlot {
  date: Date;
  time: string;
  location: string;
  available: boolean;
  url?: string;
}

interface PortalConfig {
  name: string;
  baseUrl: string;
  selectors: PortalSelectors;
  navigation: NavigationSteps[];
  rateLimitMs: number;
}

interface PortalSelectors {
  dateSlots: string;
  timeSlots: string;
  locationSelect: string;
  availabilityIndicator: string;
  bookingButton: string;
  errorMessage: string;
}

interface NavigationSteps {
  action: 'click' | 'select' | 'input' | 'wait';
  selector: string;
  value?: string;
  waitForSelector?: string;
}

export class CitaWatcherService {
  private browser?: Browser;
  private watchers: Map<string, CitaWatcher> = new Map();
  private activeJobs: Map<string, cron.ScheduledTask> = new Map();
  private portals: Map<string, PortalConfig>;
  private onAppointmentFound?: (watcher: CitaWatcher, slots: AppointmentSlot[]) => Promise<void>;

  constructor(onAppointmentFound?: (watcher: CitaWatcher, slots: AppointmentSlot[]) => Promise<void>) {
    this.onAppointmentFound = onAppointmentFound;
    this.portals = this.initializePortalConfigs();
  }

  private initializePortalConfigs(): Map<string, PortalConfig> {
    const configs = new Map<string, PortalConfig>();

    // National Police (NIE/TIE appointments)
    configs.set('policia', {
      name: 'Policía Nacional',
      baseUrl: 'https://sede.policia.gob.es',
      rateLimitMs: 30000, // 30 seconds between requests
      selectors: {
        dateSlots: '.calendar-day:not(.disabled)',
        timeSlots: '.time-slot.available',
        locationSelect: '#provincia',
        availabilityIndicator: '.available, .libre',
        bookingButton: '.btn-reservar',
        errorMessage: '.error, .alert-danger',
      },
      navigation: [
        { action: 'click', selector: '#tramites', waitForSelector: '.tramite-list' },
        { action: 'click', selector: '[data-tramite="NIE"]', waitForSelector: '#provincia' },
        { action: 'select', selector: '#provincia', value: 'Valencia' },
        { action: 'click', selector: '.btn-continuar', waitForSelector: '.calendar' },
      ],
    });

    // DGT (Driving license appointments)
    configs.set('dgt', {
      name: 'Dirección General de Tráfico',
      baseUrl: 'https://sede.dgt.gob.es',
      rateLimitMs: 45000, // 45 seconds
      selectors: {
        dateSlots: '.calendar-date.available',
        timeSlots: '.hour-slot:not(.occupied)',
        locationSelect: '#jefatura',
        availabilityIndicator: '.disponible',
        bookingButton: '.confirmar-cita',
        errorMessage: '.mensaje-error',
      },
      navigation: [
        { action: 'click', selector: '#canjear-permiso', waitForSelector: '#jefatura' },
        { action: 'select', selector: '#jefatura', value: 'Valencia' },
        { action: 'click', selector: '.buscar-citas', waitForSelector: '.calendario' },
      ],
    });

    // Valencia Ayuntamiento (Empadronamiento)
    configs.set('ayuntamiento-valencia', {
      name: 'Ayuntamiento de Valencia',
      baseUrl: 'https://www.valencia.es/ayuntamiento/webs/sede_electronica/',
      rateLimitMs: 60000, // 1 minute
      selectors: {
        dateSlots: '.day.available',
        timeSlots: '.slot.free',
        locationSelect: '#distrito',
        availabilityIndicator: '.libre',
        bookingButton: '.solicitar-cita',
        errorMessage: '.error-msg',
      },
      navigation: [
        { action: 'click', selector: '#empadronamiento', waitForSelector: '#distrito' },
        { action: 'select', selector: '#distrito', value: 'Centro' },
        { action: 'click', selector: '.consultar-disponibilidad', waitForSelector: '.calendario-citas' },
      ],
    });

    // Generalitat Valenciana (SIP registration)
    configs.set('san-gva', {
      name: 'Conselleria de Sanidad - GVA',
      baseUrl: 'https://www.san.gva.es/',
      rateLimitMs: 40000, // 40 seconds
      selectors: {
        dateSlots: '.fecha.disponible',
        timeSlots: '.hora:not(.ocupada)',
        locationSelect: '#centro-salud',
        availabilityIndicator: '.disponible',
        bookingButton: '.pedir-cita',
        errorMessage: '.aviso-error',
      },
      navigation: [
        { action: 'click', selector: '#nueva-sip', waitForSelector: '#centro-salud' },
        { action: 'select', selector: '#centro-salud', value: 'Valencia' },
        { action: 'click', selector: '.ver-disponibilidad', waitForSelector: '.calendar-widget' },
      ],
    });

    return configs;
  }

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
  }

  async addWatcher(watcher: CitaWatcher): Promise<void> {
    this.watchers.set(watcher.id, watcher);
    await this.startWatching(watcher);
  }

  async removeWatcher(watcherId: string): Promise<void> {
    const job = this.activeJobs.get(watcherId);
    if (job) {
      job.stop();
      this.activeJobs.delete(watcherId);
    }
    this.watchers.delete(watcherId);
  }

  private async startWatching(watcher: CitaWatcher): Promise<void> {
    if (!watcher.isActive) return;

    const portalKey = this.getPortalKeyFromUrl(watcher.portalUrl);
    const portal = this.portals.get(portalKey);

    if (!portal) {
      console.error(`Unknown portal: ${watcher.portalUrl}`);
      return;
    }

    // Schedule checking every 5 minutes, but respect rate limits
    const job = cron.schedule('*/5 * * * *', async () => {
      try {
        const lastCheck = new Date(watcher.lastChecked);
        const now = new Date();
        const timeSinceLastCheck = now.getTime() - lastCheck.getTime();

        // Respect rate limits
        if (timeSinceLastCheck < portal.rateLimitMs) {
          return;
        }

        console.log(`Checking appointments for watcher ${watcher.id} on ${portal.name}`);
        
        const slots = await this.checkPortalAvailability(watcher, portal);
        
        // Update last checked time
        watcher.lastChecked = now;

        // Check if any preferred slots are available
        const availablePreferred = this.filterPreferredSlots(slots, watcher);
        
        if (availablePreferred.length > 0) {
          console.log(`Found ${availablePreferred.length} preferred appointments for watcher ${watcher.id}`);
          
          if (this.onAppointmentFound) {
            await this.onAppointmentFound(watcher, availablePreferred);
          }
        }

      } catch (error) {
        console.error(`Error checking watcher ${watcher.id}:`, error);
      }
    });

    this.activeJobs.set(watcher.id, job);
  }

  private getPortalKeyFromUrl(url: string): string {
    if (url.includes('policia.gob.es')) return 'policia';
    if (url.includes('dgt.gob.es')) return 'dgt';
    if (url.includes('valencia.es')) return 'ayuntamiento-valencia';
    if (url.includes('san.gva.es')) return 'san-gva';
    return 'unknown';
  }

  private async checkPortalAvailability(watcher: CitaWatcher, portal: PortalConfig): Promise<AppointmentSlot[]> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser!.newPage();
    
    try {
      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to portal
      await page.goto(portal.baseUrl, { waitUntil: 'networkidle2' });
      
      // Execute navigation steps
      for (const step of portal.navigation) {
        await this.executeNavigationStep(page, step);
        await page.waitForTimeout(2000); // Wait between steps
      }

      // Extract available appointment slots
      const slots = await this.extractAppointmentSlots(page, portal, watcher.location);
      
      return slots;

    } catch (error) {
      console.error(`Error checking portal ${portal.name}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  private async executeNavigationStep(page: Page, step: NavigationSteps): Promise<void> {
    switch (step.action) {
      case 'click':
        await page.click(step.selector);
        if (step.waitForSelector) {
          await page.waitForSelector(step.waitForSelector, { timeout: 10000 });
        }
        break;

      case 'select':
        if (step.value) {
          await page.select(step.selector, step.value);
        }
        break;

      case 'input':
        if (step.value) {
          await page.type(step.selector, step.value);
        }
        break;

      case 'wait':
        await page.waitForSelector(step.selector, { timeout: 10000 });
        break;
    }
  }

  private async extractAppointmentSlots(page: Page, portal: PortalConfig, location: string): Promise<AppointmentSlot[]> {
    const slots: AppointmentSlot[] = [];

    try {
      // Wait for calendar to load
      await page.waitForSelector(portal.selectors.dateSlots, { timeout: 10000 });

      // Extract available dates
      const dateElements = await page.$$(portal.selectors.dateSlots);
      
      for (const dateElement of dateElements.slice(0, 5)) { // Limit to first 5 dates to avoid overload
        try {
          const dateText = await page.evaluate(el => el.textContent?.trim(), dateElement);
          const date = this.parseCalendarDate(dateText || '');
          
          if (!date) continue;

          // Click on the date to see available times
          await dateElement.click();
          await page.waitForTimeout(1500);

          // Extract time slots for this date
          const timeElements = await page.$$(portal.selectors.timeSlots);
          
          for (const timeElement of timeElements) {
            const timeText = await page.evaluate(el => el.textContent?.trim(), timeElement);
            
            if (timeText) {
              slots.push({
                date,
                time: timeText,
                location,
                available: true,
                url: page.url(),
              });
            }
          }

        } catch (error) {
          console.error('Error extracting time slots:', error);
          continue;
        }
      }

    } catch (error) {
      console.error('Error extracting appointment slots:', error);
    }

    return slots;
  }

  private parseCalendarDate(dateText: string): Date | null {
    // Handle various date formats from different portals
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Match formats like "15", "15 ENE", "15/01", etc.
    const dayMatch = dateText.match(/(\d{1,2})/);
    if (!dayMatch) return null;

    const day = parseInt(dayMatch[1]);
    
    // Look for month indicators
    const monthNames = {
      'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11
    };

    let month = currentMonth;
    for (const [name, num] of Object.entries(monthNames)) {
      if (dateText.toLowerCase().includes(name)) {
        month = num;
        break;
      }
    }

    const date = new Date(currentYear, month, day);
    
    // If the date is in the past, assume next year
    if (date < now) {
      date.setFullYear(currentYear + 1);
    }

    return date;
  }

  private filterPreferredSlots(slots: AppointmentSlot[], watcher: CitaWatcher): AppointmentSlot[] {
    return slots.filter(slot => {
      // Check preferred dates (if any)
      if (watcher.preferredDates.length > 0) {
        const matchesPreferredDate = watcher.preferredDates.some(preferredDate => {
          const pDate = new Date(preferredDate);
          return pDate.toDateString() === slot.date.toDateString();
        });
        if (!matchesPreferredDate) return false;
      }

      // Check preferred times (if any)
      if (watcher.preferredTimes.length > 0) {
        const matchesPreferredTime = watcher.preferredTimes.some(preferredTime => {
          return slot.time.includes(preferredTime) || preferredTime.includes(slot.time);
        });
        if (!matchesPreferredTime) return false;
      }

      return true;
    });
  }

  async getWatcherStatus(watcherId: string): Promise<{ isActive: boolean; lastChecked: Date | null }> {
    const watcher = this.watchers.get(watcherId);
    const job = this.activeJobs.get(watcherId);

    return {
      isActive: !!job && watcher?.isActive === true,
      lastChecked: watcher?.lastChecked || null,
    };
  }

  async pauseWatcher(watcherId: string): Promise<void> {
    const job = this.activeJobs.get(watcherId);
    if (job) {
      job.stop();
    }

    const watcher = this.watchers.get(watcherId);
    if (watcher) {
      watcher.isActive = false;
    }
  }

  async resumeWatcher(watcherId: string): Promise<void> {
    const watcher = this.watchers.get(watcherId);
    if (watcher) {
      watcher.isActive = true;
      await this.startWatching(watcher);
    }
  }

  async cleanup(): Promise<void> {
    // Stop all jobs
    for (const job of this.activeJobs.values()) {
      job.stop();
    }
    this.activeJobs.clear();

    // Close browser
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined;
    }
  }

  // Utility method to create a watcher from task information
  static createWatcherFromTask(taskId: string, userId: string, taskType: string, location: string = 'Valencia'): CitaWatcher {
    const portalMappings: Record<string, string> = {
      'nie_application': 'https://sede.policia.gob.es',
      'tie_renewal': 'https://sede.policia.gob.es',
      'driving_license_exchange': 'https://sede.dgt.gob.es',
      'empadronamiento': 'https://www.valencia.es/ayuntamiento/webs/sede_electronica/',
      'sip_registration': 'https://www.san.gva.es/',
    };

    return {
      id: `${taskId}-watcher`,
      userId,
      taskId,
      portalUrl: portalMappings[taskType] || 'https://sede.policia.gob.es',
      location,
      preferredDates: [],
      preferredTimes: ['09:00', '10:00', '11:00', '12:00'], // Default to morning slots
      isActive: true,
      lastChecked: new Date(),
      createdAt: new Date(),
    };
  }
}