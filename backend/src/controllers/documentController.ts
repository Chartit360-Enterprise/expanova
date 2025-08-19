import { Router, Request, Response } from 'express';
import multer from 'multer';
import { DocumentProcessor } from '../services/documentProcessor';
import { DocumentType, UserDocument } from '../types/shared';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'));
    }
  },
});

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// POST /api/documents/upload - Upload and process document
router.post('/upload', upload.single('file'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.body.userId || req.user?.id;
    const documentType = req.body.documentType as DocumentType;
    const file = req.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        error: { code: 'NO_FILE', message: 'No file uploaded' }
      });
    }

    if (!documentType || !Object.values(DocumentType).includes(documentType)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_DOCUMENT_TYPE', message: 'Valid document type is required' }
      });
    }

    const documentProcessor = req.app.locals.documentProcessor as DocumentProcessor;
    
    // Process the document
    const processedDocument = await documentProcessor.processDocument(
      file.buffer,
      file.originalname,
      documentType,
      userId
    );

    res.json({
      success: true,
      data: { document: processedDocument }
    });

  } catch (error) {
    console.error('Document upload error:', error);
    
    if (error instanceof Error && error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_FILE_TYPE', message: error.message }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: 'UPLOAD_FAILED', message: 'Failed to upload and process document' }
    });
  }
});

// GET /api/documents - Get user's documents
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    // In real implementation, fetch from database
    // For demo, return mock documents
    const mockDocuments: UserDocument[] = [];

    res.json({
      success: true,
      data: { documents: mockDocuments }
    });

  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch documents' }
    });
  }
});

// GET /api/documents/:documentId - Get specific document
router.get('/:documentId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { documentId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_DOCUMENT_ID', message: 'Document ID is required' }
      });
    }

    // In real implementation, fetch from database and verify ownership
    // For demo, return 404
    res.status(404).json({
      success: false,
      error: { code: 'DOCUMENT_NOT_FOUND', message: 'Document not found' }
    });

  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch document' }
    });
  }
});

// DELETE /api/documents/:documentId - Delete document
router.delete('/:documentId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { documentId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_DOCUMENT_ID', message: 'Document ID is required' }
      });
    }

    // In real implementation, verify ownership and delete from database and storage
    // For demo, return success
    res.json({
      success: true,
      data: { message: 'Document deleted successfully' }
    });

  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      error: { code: 'DELETE_FAILED', message: 'Failed to delete document' }
    });
  }
});

// POST /api/documents/:documentId/process - Reprocess document
router.post('/:documentId/process', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { documentId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' }
      });
    }

    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_DOCUMENT_ID', message: 'Document ID is required' }
      });
    }

    // In real implementation, fetch document, decrypt, and reprocess
    res.status(501).json({
      success: false,
      error: { code: 'NOT_IMPLEMENTED', message: 'Document reprocessing not yet implemented' }
    });

  } catch (error) {
    console.error('Error reprocessing document:', error);
    res.status(500).json({
      success: false,
      error: { code: 'REPROCESS_FAILED', message: 'Failed to reprocess document' }
    });
  }
});

// GET /api/documents/types - Get supported document types
router.get('/types', async (req: Request, res: Response) => {
  try {
    const documentTypes = Object.values(DocumentType).map(type => ({
      value: type,
      label: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: getDocumentTypeDescription(type),
    }));

    res.json({
      success: true,
      data: { documentTypes }
    });

  } catch (error) {
    console.error('Error fetching document types:', error);
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch document types' }
    });
  }
});

function getDocumentTypeDescription(type: DocumentType): string {
  const descriptions: Record<DocumentType, string> = {
    [DocumentType.PASSPORT]: 'Your official passport for identification',
    [DocumentType.NIE_TIE]: 'Foreigner identification number or card',
    [DocumentType.EMPADRONAMIENTO]: 'Municipal registration certificate',
    [DocumentType.RENTAL_CONTRACT]: 'Lease agreement or rental contract',
    [DocumentType.BANK_STATEMENT]: 'Recent bank account statement',
    [DocumentType.WORK_CONTRACT]: 'Employment contract or job offer',
    [DocumentType.SIP_CARD]: 'Valencian health system card',
    [DocumentType.DRIVING_LICENSE]: 'Your current driving license',
  };

  return descriptions[type] || 'Document for bureaucratic procedures';
}

export { router as documentRoutes };