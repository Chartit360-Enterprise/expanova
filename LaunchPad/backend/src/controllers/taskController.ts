import { Router, Request, Response } from 'express';
import { RoadmapEngine } from '../services/roadmapEngine';
import { BureaucraticTask, TaskStatus, User } from '../types/shared';

const router = Router();
const roadmapEngine = new RoadmapEngine();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// GET /api/tasks - Get all tasks for a user (free for all)
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.query.userId as string || req.user?.id || 'demo-user';

    // In a real implementation, this would fetch from database
    // For now, return mock tasks
    const mockTasks: BureaucraticTask[] = [
      {
        id: `${userId}-nie`,
        type: 'nie_application' as any,
        title: 'Apply for NIE (Número de Identificación de Extranjero)',
        description: 'Obtain your foreigner identification number, required for most administrative procedures in Spain.',
        priority: 'urgent',
        status: 'documents_needed' as any,
        userId,
        dependencies: [],
        requiredDocuments: ['passport' as any, 'rental_contract' as any],
        officialPortals: ['https://sede.policia.gob.es'],
        estimatedDuration: 14,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          fees: 10.71,
          nextSteps: [
            'Upload required documents',
            'Book appointment at police station',
            'Prepare form EX-15 and pay fees'
          ],
        },
      }
    ];

    res.json({
      success: true,
      data: { tasks: mockTasks }
    });

  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch tasks' }
    });
  }
});

// POST /api/tasks/generate-roadmap - Generate personalized roadmap
router.post('/generate-roadmap', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { user } = req.body;
    
    if (!user) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_USER_DATA', message: 'User data is required' }
      });
    }

    const tasks = roadmapEngine.generatePersonalizedRoadmap(user);

    res.json({
      success: true,
      data: { tasks }
    });

  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({
      success: false,
      error: { code: 'ROADMAP_GENERATION_FAILED', message: 'Failed to generate roadmap' }
    });
  }
});

// PATCH /api/tasks/:taskId - Update task status
router.patch('/:taskId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    
    if (!taskId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_TASK_ID', message: 'Task ID is required' }
      });
    }

    if (!status || !Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_STATUS', message: 'Valid status is required' }
      });
    }

    // In a real implementation, this would update the database
    // For now, return success
    const updatedTask = {
      id: taskId,
      status,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: { task: updatedTask }
    });

  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_FAILED', message: 'Failed to update task' }
    });
  }
});

// GET /api/tasks/:taskId - Get specific task
router.get('/:taskId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    
    if (!taskId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_TASK_ID', message: 'Task ID is required' }
      });
    }

    // Mock task data - in real implementation, fetch from database
    const mockTask: BureaucraticTask = {
      id: taskId,
      type: 'nie_application' as any,
      title: 'Apply for NIE',
      description: 'Obtain your foreigner identification number',
      priority: 'urgent',
      status: 'documents_needed' as any,
      userId: req.user?.id || 'unknown',
      dependencies: [],
      requiredDocuments: ['passport' as any],
      officialPortals: ['https://sede.policia.gob.es'],
      estimatedDuration: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {},
    };

    res.json({
      success: true,
      data: { task: mockTask }
    });

  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch task' }
    });
  }
});

// GET /api/tasks/eligible - Get tasks that can be worked on now (free for all)
router.get('/eligible', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user';

    // In real implementation, fetch user tasks and filter eligible ones
    const allTasks: BureaucraticTask[] = []; // Would fetch from database
    const eligibleTasks = roadmapEngine.getEligibleTasks(allTasks);

    res.json({
      success: true,
      data: { tasks: eligibleTasks }
    });

  } catch (error) {
    console.error('Error fetching eligible tasks:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch eligible tasks' }
    });
  }
});

// GET /api/tasks/deadlines - Get upcoming deadlines (free for all)
router.get('/deadlines', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const daysAhead = parseInt(req.query.days as string) || 30;

    // In real implementation, fetch user tasks
    const allTasks: BureaucraticTask[] = []; // Would fetch from database
    const upcomingDeadlines = roadmapEngine.getUpcomingDeadlines(allTasks, daysAhead);

    res.json({
      success: true,
      data: { tasks: upcomingDeadlines }
    });

  } catch (error) {
    console.error('Error fetching deadlines:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch deadlines' }
    });
  }
});

export { router as taskRoutes };