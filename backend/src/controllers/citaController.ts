import { Router, Request, Response } from 'express';
import { CitaWatcherService } from '../services/citaWatcher';
import { CitaWatcher } from '../types/shared';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// POST /api/cita/watchers - Create new appointment watcher
router.post('/watchers', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { taskId, portalUrl, location, preferredDates, preferredTimes } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!taskId || !portalUrl) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Task ID and portal URL are required' }
      });
    }

    const citaWatcherService = req.app.locals.citaWatcherService as CitaWatcherService;
    
    const watcher: CitaWatcher = {
      id: `watcher-${userId}-${taskId}-${Date.now()}`,
      userId,
      taskId,
      portalUrl,
      location: location || 'Valencia',
      preferredDates: preferredDates ? preferredDates.map((d: string) => new Date(d)) : [],
      preferredTimes: preferredTimes || ['09:00', '10:00', '11:00', '12:00'],
      isActive: true,
      lastChecked: new Date(),
      createdAt: new Date(),
    };

    await citaWatcherService.addWatcher(watcher);

    res.json({
      success: true,
      data: { watcher }
    });

  } catch (error) {
    console.error('Error creating cita watcher:', error);
    res.status(500).json({
      success: false,
      error: { code: 'WATCHER_CREATION_FAILED', message: 'Failed to create appointment watcher' }
    });
  }
});

// GET /api/cita/watchers - Get user's appointment watchers
router.get('/watchers', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // In real implementation, fetch from database
    // For demo, return empty array
    const watchers: CitaWatcher[] = [];

    res.json({
      success: true,
      data: { watchers }
    });

  } catch (error) {
    console.error('Error fetching cita watchers:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch appointment watchers' }
    });
  }
});

// GET /api/cita/watchers/:watcherId/status - Get watcher status
router.get('/watchers/:watcherId/status', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { watcherId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!watcherId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_WATCHER_ID', message: 'Watcher ID is required' }
      });
    }

    const citaWatcherService = req.app.locals.citaWatcherService as CitaWatcherService;
    const status = await citaWatcherService.getWatcherStatus(watcherId);

    res.json({
      success: true,
      data: { status }
    });

  } catch (error) {
    console.error('Error getting watcher status:', error);
    res.status(500).json({
      success: false,
      error: { code: 'STATUS_CHECK_FAILED', message: 'Failed to check watcher status' }
    });
  }
});

// PATCH /api/cita/watchers/:watcherId/pause - Pause appointment watcher
router.patch('/watchers/:watcherId/pause', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { watcherId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    const citaWatcherService = req.app.locals.citaWatcherService as CitaWatcherService;
    await citaWatcherService.pauseWatcher(watcherId);

    res.json({
      success: true,
      data: { message: 'Watcher paused successfully' }
    });

  } catch (error) {
    console.error('Error pausing watcher:', error);
    res.status(500).json({
      success: false,
      error: { code: 'PAUSE_FAILED', message: 'Failed to pause watcher' }
    });
  }
});

// PATCH /api/cita/watchers/:watcherId/resume - Resume appointment watcher
router.patch('/watchers/:watcherId/resume', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { watcherId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    const citaWatcherService = req.app.locals.citaWatcherService as CitaWatcherService;
    await citaWatcherService.resumeWatcher(watcherId);

    res.json({
      success: true,
      data: { message: 'Watcher resumed successfully' }
    });

  } catch (error) {
    console.error('Error resuming watcher:', error);
    res.status(500).json({
      success: false,
      error: { code: 'RESUME_FAILED', message: 'Failed to resume watcher' }
    });
  }
});

// DELETE /api/cita/watchers/:watcherId - Remove appointment watcher
router.delete('/watchers/:watcherId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { watcherId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    const citaWatcherService = req.app.locals.citaWatcherService as CitaWatcherService;
    await citaWatcherService.removeWatcher(watcherId);

    res.json({
      success: true,
      data: { message: 'Watcher removed successfully' }
    });

  } catch (error) {
    console.error('Error removing watcher:', error);
    res.status(500).json({
      success: false,
      error: { code: 'REMOVAL_FAILED', message: 'Failed to remove watcher' }
    });
  }
});

// POST /api/cita/check-availability - Manually check portal availability
router.post('/check-availability', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { portalUrl, location } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!portalUrl) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PORTAL_URL', message: 'Portal URL is required' }
      });
    }

    // In real implementation, manually trigger a check
    // For demo, return mock availability
    const mockSlots = [
      {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '10:00',
        location: location || 'Valencia',
        available: true,
        url: portalUrl,
      },
    ];

    res.json({
      success: true,
      data: { slots: mockSlots }
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      error: { code: 'CHECK_FAILED', message: 'Failed to check availability' }
    });
  }
});

// GET /api/cita/supported-portals - Get list of supported portals
router.get('/supported-portals', async (req: Request, res: Response) => {
  try {
    const supportedPortals = [
      {
        name: 'Policía Nacional',
        url: 'https://sede.policia.gob.es',
        description: 'NIE/TIE applications and renewals',
        taskTypes: ['nie_application', 'tie_renewal'],
      },
      {
        name: 'Dirección General de Tráfico',
        url: 'https://sede.dgt.gob.es',
        description: 'Driving license exchange and renewals',
        taskTypes: ['driving_license_exchange'],
      },
      {
        name: 'Ayuntamiento de Valencia',
        url: 'https://www.valencia.es/ayuntamiento/webs/sede_electronica/',
        description: 'Municipal services including empadronamiento',
        taskTypes: ['empadronamiento'],
      },
      {
        name: 'Conselleria de Sanidad - GVA',
        url: 'https://www.san.gva.es/',
        description: 'Healthcare registration and SIP card',
        taskTypes: ['sip_registration'],
      },
    ];

    res.json({
      success: true,
      data: { portals: supportedPortals }
    });

  } catch (error) {
    console.error('Error fetching supported portals:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch supported portals' }
    });
  }
});

export { router as citaRoutes };