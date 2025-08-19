import { Router, Request, Response } from 'express';
import { User } from '../types/shared';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// GET /api/users/profile - Get user profile
router.get('/profile', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // In real implementation, fetch from database
    // For demo, return mock user
    const mockUser: Partial<User> = {
      id: userId,
      email: req.user?.email,
      nationality: 'United States',
      visaType: 'work',
      familySituation: 'single',
      moveInDate: new Date('2024-01-15'),
      hasChildren: false,
      isWorking: true,
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        preferredLanguage: 'en',
        documents: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: { user: mockUser }
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch user profile' }
    });
  }
});

// PATCH /api/users/profile - Update user profile
router.patch('/profile', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // Validate updates
    const allowedUpdates = [
      'nationality', 'visaType', 'familySituation', 'hasChildren', 'isWorking',
      'profile.firstName', 'profile.lastName', 'profile.phone', 'profile.address', 'profile.preferredLanguage'
    ];

    const requestedUpdates = Object.keys(updates);
    const isValidOperation = requestedUpdates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_UPDATES', message: 'Invalid update fields' }
      });
    }

    // In real implementation, update database
    // For demo, return success with updates
    const updatedUser = {
      id: userId,
      ...updates,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      data: { user: updatedUser }
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_FAILED', message: 'Failed to update user profile' }
    });
  }
});

// GET /api/users/onboarding-status - Check onboarding completion
router.get('/onboarding-status', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // In real implementation, check user's onboarding progress
    const onboardingStatus = {
      isComplete: true,
      completedSteps: [
        'basic_info',
        'visa_details',
        'family_situation',
        'work_status',
      ],
      nextStep: null,
      progress: 100,
    };

    res.json({
      success: true,
      data: { onboardingStatus }
    });

  } catch (error) {
    console.error('Error checking onboarding status:', error);
    res.status(500).json({
      success: false,
      error: { code: 'CHECK_FAILED', message: 'Failed to check onboarding status' }
    });
  }
});

// POST /api/users/complete-onboarding - Complete onboarding step
router.post('/complete-onboarding', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { step, data } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!step) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_STEP', message: 'Onboarding step is required' }
      });
    }

    // In real implementation, save onboarding progress
    res.json({
      success: true,
      data: { message: `Onboarding step '${step}' completed successfully` }
    });

  } catch (error) {
    console.error('Error completing onboarding step:', error);
    res.status(500).json({
      success: false,
      error: { code: 'COMPLETION_FAILED', message: 'Failed to complete onboarding step' }
    });
  }
});

// DELETE /api/users/account - Delete user account
router.delete('/account', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { confirmPassword } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_CONFIRMATION', message: 'Password confirmation is required' }
      });
    }

    // In real implementation:
    // 1. Verify password
    // 2. Delete all user data (documents, tasks, etc.)
    // 3. Remove user account
    // 4. Cleanup any scheduled jobs

    res.json({
      success: true,
      data: { message: 'Account deleted successfully' }
    });

  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({
      success: false,
      error: { code: 'DELETION_FAILED', message: 'Failed to delete account' }
    });
  }
});

// GET /api/users/export-data - Export user data (GDPR compliance)
router.get('/export-data', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // In real implementation, gather all user data
    const userData = {
      profile: {
        id: userId,
        email: req.user?.email,
        createdAt: new Date(),
      },
      tasks: [],
      documents: [],
      chatSessions: [],
      watchers: [],
      exportedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: { userData }
    });

  } catch (error) {
    console.error('Error exporting user data:', error);
    res.status(500).json({
      success: false,
      error: { code: 'EXPORT_FAILED', message: 'Failed to export user data' }
    });
  }
});

export { router as userRoutes };