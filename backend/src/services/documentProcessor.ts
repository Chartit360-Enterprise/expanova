import { createWorker } from 'tesseract.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import { DocumentType, UserDocument, FormField } from '../types/shared';

interface ExtractionResult {
  text: string;
  extractedData: Record<string, any>;
  confidence: number;
}

interface DocumentTemplate {
  type: DocumentType;
  patterns: RegexPattern[];
  fields: ExtractionField[];
}

interface RegexPattern {
  field: string;
  pattern: RegExp;
  transform?: (match: string) => any;
}

interface ExtractionField {
  name: string;
  patterns: RegExp[];
  required: boolean;
  type: 'string' | 'date' | 'number';
  validation?: (value: any) => boolean;
}

export class DocumentProcessor {
  private worker?: Awaited<ReturnType<typeof createWorker>>;
  private encryptionKey: string;

  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }

  async initialize(): Promise<void> {
    if (!this.worker) {
      this.worker = await createWorker('eng+spa');
    }
  }

  async processDocument(
    file: Buffer,
    filename: string,
    documentType: DocumentType,
    userId: string
  ): Promise<UserDocument> {
    await this.initialize();

    // Extract text using OCR
    const extractionResult = await this.extractTextFromDocument(file);
    
    // Parse document-specific data
    const extractedData = this.parseDocumentData(extractionResult.text, documentType);

    // Encrypt and store document
    const encryptedPath = await this.encryptAndStoreDocument(file, filename, userId);

    const document: UserDocument = {
      id: crypto.randomUUID(),
      type: documentType,
      fileName: filename,
      encryptedPath,
      extractedData,
      uploadedAt: new Date(),
      expiryDate: this.extractExpiryDate(extractedData, documentType),
    };

    return document;
  }

  private async extractTextFromDocument(file: Buffer): Promise<ExtractionResult> {
    if (!this.worker) {
      throw new Error('OCR worker not initialized');
    }

    const { data: { text, confidence } } = await this.worker.recognize(file);

    return {
      text,
      extractedData: {},
      confidence,
    };
  }

  private parseDocumentData(text: string, documentType: DocumentType): Record<string, any> {
    const template = this.getDocumentTemplate(documentType);
    const extractedData: Record<string, any> = {};

    for (const field of template.fields) {
      for (const pattern of field.patterns) {
        const match = text.match(pattern);
        if (match) {
          let value = match[1] || match[0];
          
          // Apply type conversion
          switch (field.type) {
            case 'date':
              const dateValue = this.parseDate(value);
              value = dateValue ? dateValue.toISOString() : value;
              break;
            case 'number':
              value = parseFloat(value.replace(/[^\d.-]/g, '')).toString();
              break;
            case 'string':
            default:
              value = value.trim();
              break;
          }

          // Validate if validation function exists
          if (field.validation && !field.validation(value)) {
            continue;
          }

          extractedData[field.name] = value;
          break;
        }
      }
    }

    return extractedData;
  }

  private getDocumentTemplate(documentType: DocumentType): DocumentTemplate {
    const templates: Record<DocumentType, DocumentTemplate> = {
      [DocumentType.PASSPORT]: {
        type: DocumentType.PASSPORT,
        patterns: [],
        fields: [
          {
            name: 'passportNumber',
            patterns: [
              /Passport\s+No\.?\s*([A-Z0-9]+)/i,
              /Pasaporte\s+N[°º]\.?\s*([A-Z0-9]+)/i,
              /N[°º]\s+([A-Z0-9]{6,12})/
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'givenNames',
            patterns: [
              /Given\s+names?\s*[:\-]?\s*([A-ZÁÉÍÓÚÜ\s]+)/i,
              /Nombres?\s*[:\-]?\s*([A-ZÁÉÍÓÚÜ\s]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'surname',
            patterns: [
              /Surname\s*[:\-]?\s*([A-ZÁÉÍÓÚÜ\s]+)/i,
              /Apellidos?\s*[:\-]?\s*([A-ZÁÉÍÓÚÜ\s]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'nationality',
            patterns: [
              /Nationality\s*[:\-]?\s*([A-Z\s]+)/i,
              /Nacionalidad\s*[:\-]?\s*([A-Z\s]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'dateOfBirth',
            patterns: [
              /Date\s+of\s+birth\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
              /Fecha\s+de\s+nacimiento\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
            ],
            required: true,
            type: 'date',
          },
          {
            name: 'expiryDate',
            patterns: [
              /Date\s+of\s+expiry\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
              /Fecha\s+de\s+vencimiento\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
            ],
            required: true,
            type: 'date',
          },
        ],
      },
      [DocumentType.NIE_TIE]: {
        type: DocumentType.NIE_TIE,
        patterns: [],
        fields: [
          {
            name: 'nieNumber',
            patterns: [
              /N\.?I\.?E\.?\s*:?\s*([XYZ]\d{7}[A-Z])/i,
              /([XYZ]\d{7}[A-Z])/,
            ],
            required: true,
            type: 'string',
            validation: (value: string) => /^[XYZ]\d{7}[A-Z]$/.test(value),
          },
          {
            name: 'fullName',
            patterns: [
              /Apellidos\s+y\s+nombre\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
              /Nombre\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'nationality',
            patterns: [
              /Nacionalidad\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'expiryDate',
            patterns: [
              /Válida\s+hasta\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
              /Fecha\s+de\s+vencimiento\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
            ],
            required: true,
            type: 'date',
          },
        ],
      },
      [DocumentType.EMPADRONAMIENTO]: {
        type: DocumentType.EMPADRONAMIENTO,
        patterns: [],
        fields: [
          {
            name: 'fullName',
            patterns: [
              /Nombre\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
              /Apellidos\s+y\s+nombre\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'address',
            patterns: [
              /Domicilio\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ0-9\s,\.]+)/i,
              /Dirección\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ0-9\s,\.]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'municipality',
            patterns: [
              /Municipio\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'registrationDate',
            patterns: [
              /Fecha\s+de\s+alta\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
            ],
            required: false,
            type: 'date',
          },
        ],
      },
      [DocumentType.RENTAL_CONTRACT]: {
        type: DocumentType.RENTAL_CONTRACT,
        patterns: [],
        fields: [
          {
            name: 'tenantName',
            patterns: [
              /Arrendatario\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
              /Inquilino\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'landlordName',
            patterns: [
              /Arrendador\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
              /Propietario\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ\s,]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'propertyAddress',
            patterns: [
              /Vivienda\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ0-9\s,\.]+)/i,
              /Inmueble\s*[:\-]?\s*([A-ZÁÉÍÓÚÜÑ0-9\s,\.]+)/i,
              /sita\s+en\s*([A-ZÁÉÍÓÚÜÑ0-9\s,\.]+)/i,
            ],
            required: true,
            type: 'string',
          },
          {
            name: 'monthlyRent',
            patterns: [
              /Renta\s+mensual\s*[:\-]?\s*([0-9.,]+)\s*€?/i,
              /Alquiler\s*[:\-]?\s*([0-9.,]+)\s*€?/i,
            ],
            required: true,
            type: 'number',
          },
          {
            name: 'contractStartDate',
            patterns: [
              /Fecha\s+de\s+inicio\s*[:\-]?\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
              /a\s+partir\s+del\s+día\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
            ],
            required: true,
            type: 'date',
          },
        ],
      },
      // Add more document templates as needed
      [DocumentType.BANK_STATEMENT]: { type: DocumentType.BANK_STATEMENT, patterns: [], fields: [] },
      [DocumentType.WORK_CONTRACT]: { type: DocumentType.WORK_CONTRACT, patterns: [], fields: [] },
      [DocumentType.SIP_CARD]: { type: DocumentType.SIP_CARD, patterns: [], fields: [] },
      [DocumentType.DRIVING_LICENSE]: { type: DocumentType.DRIVING_LICENSE, patterns: [], fields: [] },
    };

    return templates[documentType];
  }

  private parseDate(dateStr: string): Date | null {
    // Handle various date formats
    const formats = [
      /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,  // DD/MM/YYYY or MM/DD/YYYY
      /(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/,  // YYYY/MM/DD
    ];

    for (const format of formats) {
      const match = dateStr.match(format);
      if (match) {
        const [, part1, part2, part3] = match;
        
        // Try both DD/MM/YYYY and MM/DD/YYYY
        const date1 = new Date(parseInt(part3), parseInt(part2) - 1, parseInt(part1));
        const date2 = new Date(parseInt(part3), parseInt(part1) - 1, parseInt(part2));
        
        // Return the one that makes more sense (not in future for birth dates, etc.)
        return date1.getTime() < Date.now() ? date1 : date2;
      }
    }

    return null;
  }

  private extractExpiryDate(extractedData: Record<string, any>, documentType: DocumentType): Date | undefined {
    if (extractedData.expiryDate) {
      return new Date(extractedData.expiryDate);
    }

    // Set default expiry periods for certain documents
    switch (documentType) {
      case DocumentType.EMPADRONAMIENTO:
        // Empadronamiento certificates are typically valid for 3 months
        return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
      default:
        return undefined;
    }
  }

  private async encryptAndStoreDocument(file: Buffer, filename: string, userId: string): Promise<string> {
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, this.encryptionKey);

    const encrypted = Buffer.concat([cipher.update(file), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Create storage path
    const userDir = path.join(process.cwd(), 'storage', 'documents', userId);
    await fs.mkdir(userDir, { recursive: true });

    const encryptedFilename = `${crypto.randomUUID()}.enc`;
    const filePath = path.join(userDir, encryptedFilename);

    // Store encrypted file with metadata
    const fileData = {
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      encrypted: encrypted.toString('hex'),
      originalName: filename,
    };

    await fs.writeFile(filePath, JSON.stringify(fileData));

    return filePath;
  }

  async decryptDocument(encryptedPath: string): Promise<Buffer> {
    const fileData = JSON.parse(await fs.readFile(encryptedPath, 'utf-8'));
    
    const algorithm = 'aes-256-gcm';
    const decipher = crypto.createDecipher(algorithm, this.encryptionKey);
    
    decipher.setAuthTag(Buffer.from(fileData.authTag, 'hex'));
    
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(fileData.encrypted, 'hex')),
      decipher.final()
    ]);

    return decrypted;
  }

  async prefilFormFields(extractedData: Record<string, any>, formFields: FormField[]): Promise<Record<string, any>> {
    const prefilledData: Record<string, any> = {};

    for (const field of formFields) {
      if (field.mappedDocument && field.extractionPath) {
        const value = this.getNestedValue(extractedData, field.extractionPath);
        if (value) {
          prefilledData[field.name] = value;
        }
      }
    }

    return prefilledData;
  }

  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  async cleanup(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = undefined;
    }
  }
}