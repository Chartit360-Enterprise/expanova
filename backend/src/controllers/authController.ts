import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../types/shared';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, nationality, visaType, familySituation, hasChildren, isWorking } = req.body;
    
    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Email, password, first name, and last name are required' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'Invalid email format' }
      });
    }

    // Check if user already exists (in real implementation, check database)
    // For demo purposes, we'll just proceed

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      nationality: nationality || 'Unknown',
      visaType: visaType || 'tourist',
      familySituation: familySituation || 'single',
      moveInDate: new Date(),
      hasChildren: hasChildren || false,
      isWorking: isWorking || false,
      profile: {
        firstName,
        lastName,
        preferredLanguage: 'en',
        documents: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In real implementation, save to database
    // For demo, we'll just proceed to token generation

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          profile: newUser.profile,
        },
        token,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'REGISTRATION_FAILED', message: 'Failed to register user' }
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_CREDENTIALS', message: 'Email and password are required' }
      });
    }

    // In real implementation, fetch user from database
    // For demo, create mock user
    const mockUser: User = {
      id: 'user-demo',
      email,
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

    // In real implementation, verify password against hash
    // For demo, accept any password that's not empty
    if (!password) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: mockUser.id,
          email: mockUser.email,
          profile: mockUser.profile,
        },
        token,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'LOGIN_FAILED', message: 'Failed to login' }
    });
  }
});

// POST /api/auth/refresh - Refresh token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_TOKEN', message: 'Token is required' }
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // Generate new token
      const newToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        data: { token: newToken }
      });

    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      });
    }

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'REFRESH_FAILED', message: 'Failed to refresh token' }
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', async (req: Request, res: Response) => {
  try {
    // In real implementation, might blacklist the token
    // For now, just return success
    res.json({
      success: true,
      data: { message: 'Successfully logged out' }
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'LOGOUT_FAILED', message: 'Failed to logout' }
    });
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: { code: 'NO_TOKEN', message: 'No authorization token provided' }
      });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // In real implementation, fetch full user from database
      const mockUser = {
        id: decoded.userId,
        email: decoded.email,
        profile: {
          firstName: 'Demo',
          lastName: 'User',
          preferredLanguage: 'en',
        },
      };

      res.json({
        success: true,
        data: { user: mockUser }
      });

    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      });
    }

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'GET_USER_FAILED', message: 'Failed to get user info' }
    });
  }
});

export { router as authRoutes };