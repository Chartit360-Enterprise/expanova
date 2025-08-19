import { Notification, NotificationType, BureaucraticTask, CitaWatcher } from '../types/shared';
import * as cron from 'node-cron';

interface NotificationQueue {
  id: string;
  notification: Notification;
  scheduledFor: Date;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class NotificationService {
  private notificationQueue: Map<string, NotificationQueue> = new Map();
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map();
  private emailConfig: EmailConfig;

  constructor() {
    this.emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    this.startDeadlineChecker();
    this.startExpiryChecker();
  }

  // Create and send notifications
  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      taskId?: string;
      priority?: 'low' | 'medium' | 'high';
      actionUrl?: string;
      expiresAt?: Date;
      sendEmail?: boolean;
      sendPush?: boolean;
      scheduleFor?: Date;
    }
  ): Promise<Notification> {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      taskId: options?.taskId,
      type,
      title,
      message,
      priority: options?.priority || 'medium',
      isRead: false,
      actionUrl: options?.actionUrl,
      createdAt: new Date(),
      expiresAt: options?.expiresAt,
    };

    if (options?.scheduleFor && options.scheduleFor > new Date()) {
      // Schedule notification for later
      this.scheduleNotification(notification, options.scheduleFor);
    } else {
      // Send immediately
      await this.sendNotification(notification, {
        sendEmail: options?.sendEmail || false,
        sendPush: options?.sendPush || false,
      });
    }

    return notification;
  }

  // Schedule notification for future delivery
  private scheduleNotification(notification: Notification, scheduledFor: Date): void {
    const queueItem: NotificationQueue = {
      id: notification.id,
      notification,
      scheduledFor,
    };

    this.notificationQueue.set(notification.id, queueItem);

    // Create cron job for the scheduled time
    const cronExpression = this.dateToCronExpression(scheduledFor);
    const job = cron.schedule(cronExpression, async () => {
      await this.sendNotification(notification);
      this.notificationQueue.delete(notification.id);
      this.scheduledJobs.delete(notification.id);
      job.stop();
    }, {
      scheduled: true,
      timezone: 'Europe/Madrid', // Valencia timezone
    });

    this.scheduledJobs.set(notification.id, job);
  }

  // Convert Date to cron expression
  private dateToCronExpression(date: Date): string {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // For one-time execution, we'll use a specific date
    return `${minute} ${hour} ${day} ${month} *`;
  }

  // Send notification via various channels
  private async sendNotification(
    notification: Notification,
    options: { sendEmail?: boolean; sendPush?: boolean } = {}
  ): Promise<void> {
    try {
      // Store in database (in real implementation)
      console.log(`📢 Notification created: ${notification.title}`);

      // Send email notification
      if (options.sendEmail) {
        await this.sendEmailNotification(notification);
      }

      // Send push notification
      if (options.sendPush) {
        await this.sendPushNotification(notification);
      }

      // Send in-app notification (real-time via WebSocket in real implementation)
      await this.sendInAppNotification(notification);

    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }

  // Email notification
  private async sendEmailNotification(notification: Notification): Promise<void> {
    try {
      // In real implementation, use nodemailer or similar
      console.log(`📧 Email notification sent: ${notification.title}`);
      
      // Mock email sending
      const emailContent = this.generateEmailContent(notification);
      console.log('Email content:', emailContent);

    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  }

  private generateEmailContent(notification: Notification): string {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    return `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🤖 Expanova Notification</h1>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">${notification.title}</h2>
            <p style="color: #666; line-height: 1.6;">${notification.message}</p>
            
            ${notification.actionUrl ? `
              <div style="margin: 20px 0;">
                <a href="${notification.actionUrl}" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Take Action
                </a>
              </div>
            ` : ''}
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #999; font-size: 14px; margin: 0;">
              This notification was sent by Expanova, your AI bureaucracy assistant.<br>
              <a href="${baseUrl}/expanova" style="color: #667eea;">Visit your dashboard</a>
            </p>
          </div>
        </body>
      </html>
    `;
  }

  // Push notification (would integrate with service like Firebase Cloud Messaging)
  private async sendPushNotification(notification: Notification): Promise<void> {
    try {
      console.log(`🔔 Push notification sent: ${notification.title}`);
      
      // In real implementation, use FCM or similar service
      const pushPayload = {
        title: notification.title,
        body: notification.message,
        icon: '/icons/expanova-icon.png',
        badge: '/icons/expanova-badge.png',
        data: {
          notificationId: notification.id,
          actionUrl: notification.actionUrl,
          type: notification.type,
        },
      };

      console.log('Push payload:', pushPayload);

    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  }

  // In-app notification
  private async sendInAppNotification(notification: Notification): Promise<void> {
    try {
      // In real implementation, use WebSocket to send real-time notification
      console.log(`💬 In-app notification sent: ${notification.title}`);
      
      // Store in database for later retrieval
      // database.createNotification(notification);

    } catch (error) {
      console.error('Failed to send in-app notification:', error);
    }
  }

  // Task-specific notification creators
  async notifyTaskDeadlineApproaching(task: BureaucraticTask, daysUntil: number): Promise<void> {
    const urgencyLevel = daysUntil <= 3 ? 'high' : daysUntil <= 7 ? 'medium' : 'low';
    
    await this.createNotification(
      task.userId,
      NotificationType.DEADLINE_WARNING,
      `⏰ ${task.title} deadline approaching`,
      `Your "${task.title}" task is due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}. ${daysUntil <= 3 ? 'Urgent action required!' : 'Don\'t forget to complete it on time.'}`,
      {
        taskId: task.id,
        priority: urgencyLevel,
        actionUrl: `/expanova?task=${task.id}`,
        sendEmail: daysUntil <= 7,
        sendPush: daysUntil <= 3,
      }
    );
  }

  async notifyAppointmentAvailable(watcher: CitaWatcher, appointmentDetails: any): Promise<void> {
    const appointmentDate = new Date(appointmentDetails.date).toLocaleDateString();
    
    await this.createNotification(
      watcher.userId,
      NotificationType.APPOINTMENT_AVAILABLE,
      `🎯 Appointment Available!`,
      `Great news! An appointment slot is available for ${appointmentDate} at ${appointmentDetails.time} in ${appointmentDetails.location}. Book it quickly before it\\'s taken!`,
      {
        taskId: watcher.taskId,
        priority: 'high',
        actionUrl: appointmentDetails.url,
        sendEmail: true,
        sendPush: true,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expires in 2 hours
      }
    );
  }

  async notifyDocumentExpiring(userId: string, documentType: string, expiryDate: Date): Promise<void> {
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    await this.createNotification(
      userId,
      NotificationType.DOCUMENT_EXPIRING,
      `📄 ${documentType} Expiring Soon`,
      `Your ${documentType} will expire in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? 's' : ''} (${expiryDate.toLocaleDateString()}). Start the renewal process soon to avoid any issues.`,
      {
        priority: daysUntilExpiry <= 30 ? 'high' : 'medium',
        actionUrl: '/expanova?tab=documents',
        sendEmail: daysUntilExpiry <= 30,
      }
    );
  }

  async notifyTaskStatusChange(task: BureaucraticTask, oldStatus: string, newStatus: string): Promise<void> {
    const statusMessages: Record<string, string> = {
      'completed': '🎉 Congratulations! You\'ve completed this bureaucratic task.',
      'in_progress': '⏳ Your task is now in progress. Keep up the good work!',
      'appointment_scheduled': '📅 Great! Your appointment has been scheduled.',
      'waiting_response': '⏰ Your application is being processed. We\'ll notify you of any updates.',
    };

    const message = statusMessages[newStatus] || `Your task status has been updated to ${newStatus}.`;
    
    await this.createNotification(
      task.userId,
      NotificationType.TASK_REMINDER,
      `📋 ${task.title} Updated`,
      message,
      {
        taskId: task.id,
        priority: newStatus === 'completed' ? 'high' : 'medium',
        actionUrl: `/expanova?task=${task.id}`,
        sendPush: newStatus === 'completed',
      }
    );
  }

  // Automated deadline checking
  private startDeadlineChecker(): void {
    // Check for upcoming deadlines every hour
    cron.schedule('0 * * * *', async () => {
      console.log('🔍 Checking for upcoming task deadlines...');
      
      // In real implementation, query database for tasks with approaching deadlines
      // and send notifications accordingly
    });
  }

  // Automated document expiry checking
  private startExpiryChecker(): void {
    // Check for expiring documents once daily at 9 AM
    cron.schedule('0 9 * * *', async () => {
      console.log('🔍 Checking for expiring documents...');
      
      // In real implementation, query database for documents expiring soon
      // and send notifications accordingly
    });
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    try {
      // In real implementation, update database
      console.log(`✅ Notification ${notificationId} marked as read`);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  // Get user notifications
  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    try {
      // In real implementation, query database
      // For demo, return empty array
      return [];
    } catch (error) {
      console.error('Failed to get user notifications:', error);
      return [];
    }
  }

  // Cancel scheduled notification
  async cancelNotification(notificationId: string): Promise<void> {
    const job = this.scheduledJobs.get(notificationId);
    if (job) {
      job.stop();
      this.scheduledJobs.delete(notificationId);
    }
    
    this.notificationQueue.delete(notificationId);
  }

  // Cleanup
  async cleanup(): Promise<void> {
    // Stop all scheduled jobs
    for (const job of this.scheduledJobs.values()) {
      job.stop();
    }
    
    this.scheduledJobs.clear();
    this.notificationQueue.clear();
  }
}