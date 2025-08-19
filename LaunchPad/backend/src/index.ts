import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { authRoutes } from './controllers/authController';
import { taskRoutes } from './controllers/taskController';
import { documentRoutes } from './controllers/documentController';
import { chatRoutes } from './controllers/chatController';
import { citaRoutes } from './controllers/citaController';
import { userRoutes } from './controllers/userController';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';
import { CitaWatcherService } from './services/citaWatcher';
import { BuroChatService } from './services/burochatService';
import { DocumentProcessor } from './services/documentProcessor';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize services
const citaWatcherService = new CitaWatcherService();
const buroChatService = new BuroChatService(process.env.OPENAI_API_KEY || '');
const documentProcessor = new DocumentProcessor(process.env.ENCRYPTION_KEY || '');

// Make services available to routes
app.locals.citaWatcherService = citaWatcherService;
app.locals.buroChatService = buroChatService;
app.locals.documentProcessor = documentProcessor;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes - Free for all, no authentication required
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/cita', citaRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  });
});

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Cleanup services
  await citaWatcherService.cleanup();
  await documentProcessor.cleanup();
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  
  // Cleanup services
  await citaWatcherService.cleanup();
  await documentProcessor.cleanup();
  
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Expanova backend server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;