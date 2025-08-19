import { Router, Request, Response } from 'express';
import { BuroChatService } from '../services/burochatService';
import { ChatMessage, ChatSession } from '../types/shared';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// POST /api/chat/message - Send a message to BuroChat
router.post('/message', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_MESSAGE', message: 'Valid message is required' }
      });
    }

    const buroChatService = req.app.locals.buroChatService as BuroChatService;
    
    // Build context for the chat
    const context = {
      user: {
        id: userId,
        email: req.user?.email || '',
        nationality: 'United States', // Would fetch from database
        visaType: 'work' as any,
        familySituation: 'single' as any,
        moveInDate: new Date('2024-01-15'),
        hasChildren: false,
        isWorking: true,
        profile: {
          firstName: 'User',
          lastName: 'Demo',
          preferredLanguage: 'en' as any,
          documents: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      activeTasks: [], // Would fetch from database
      recentMessages: [], // Would fetch from session
      sessionContext: undefined,
    };

    // Process the message
    const response = await buroChatService.processMessage(message, context);
    
    // Generate follow-up suggestions
    const suggestions = await buroChatService.suggestFollowUpQuestions(context);

    res.json({
      success: true,
      data: {
        message: response,
        suggestions: suggestions.slice(0, 3),
        sessionId: sessionId || `session-${userId}-${Date.now()}`,
      }
    });

  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({
      success: false,
      error: { code: 'CHAT_ERROR', message: 'Failed to process message' }
    });
  }
});

// GET /api/chat/suggestions - Get suggested questions
router.get('/suggestions', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    const buroChatService = req.app.locals.buroChatService as BuroChatService;
    
    // Build minimal context for suggestions
    const context = {
      user: {
        id: userId,
        email: req.user?.email || '',
        nationality: 'United States',
        visaType: 'work' as any,
        familySituation: 'single' as any,
        moveInDate: new Date('2024-01-15'),
        hasChildren: false,
        isWorking: true,
        profile: {
          firstName: 'User',
          lastName: 'Demo',
          preferredLanguage: 'en' as any,
          documents: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      activeTasks: [], // Would fetch from database
      recentMessages: [],
    };

    const suggestions = await buroChatService.suggestFollowUpQuestions(context);

    res.json({
      success: true,
      data: { suggestions }
    });

  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SUGGESTIONS_ERROR', message: 'Failed to get suggestions' }
    });
  }
});

// GET /api/chat/sessions/:sessionId - Get chat session
router.get('/sessions/:sessionId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_SESSION_ID', message: 'Session ID is required' }
      });
    }

    // In real implementation, fetch from database
    // For now, return mock session
    const mockSession: ChatSession = {
      id: sessionId,
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: mockSession
    });

  } catch (error) {
    console.error('Error fetching chat session:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SESSION_ERROR', message: 'Failed to fetch session' }
    });
  }
});

// POST /api/chat/sessions - Create new chat session
router.post('/sessions', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { context } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // Create new session
    const sessionId = `session-${userId}-${Date.now()}`;
    const newSession: ChatSession = {
      id: sessionId,
      userId,
      messages: [],
      context,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In real implementation, save to database

    res.json({
      success: true,
      data: newSession
    });

  } catch (error) {
    console.error('Error creating chat session:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SESSION_CREATION_ERROR', message: 'Failed to create session' }
    });
  }
});

// GET /api/chat/health - Check chat service health
router.get('/health', async (req: Request, res: Response) => {
  try {
    const buroChatService = req.app.locals.buroChatService as BuroChatService;
    
    // Simple health check - in real implementation, could test OpenAI connection
    const isHealthy = !!buroChatService;

    res.json({
      success: true,
      data: {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Error checking chat health:', error);
    res.status(500).json({
      success: false,
      error: { code: 'HEALTH_CHECK_ERROR', message: 'Health check failed' }
    });
  }
});

export { router as chatRoutes };