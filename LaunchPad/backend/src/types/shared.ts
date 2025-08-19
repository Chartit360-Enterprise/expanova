export interface User {
  id: string;
  email: string;
  nationality: string;
  visaType: 'tourist' | 'student' | 'work' | 'family_reunion' | 'eu_citizen' | 'non_lucrative';
  familySituation: 'single' | 'married' | 'with_children' | 'partner';
  moveInDate: Date;
  hasChildren: boolean;
  isWorking: boolean;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  preferredLanguage: 'en' | 'es' | 'ca';
  digitalCertificate?: DigitalCertificate;
  documents: UserDocument[];
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

export interface DigitalCertificate {
  type: 'clave' | 'autofirma' | 'dnie';
  status: 'pending' | 'active' | 'expired';
  expiryDate?: Date;
}

export interface UserDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  encryptedPath: string;
  extractedData?: Record<string, any>;
  uploadedAt: Date;
  expiryDate?: Date;
}

export enum DocumentType {
  PASSPORT = 'passport',
  NIE_TIE = 'nie_tie',
  EMPADRONAMIENTO = 'empadronamiento',
  RENTAL_CONTRACT = 'rental_contract',
  BANK_STATEMENT = 'bank_statement',
  WORK_CONTRACT = 'work_contract',
  SIP_CARD = 'sip_card',
  DRIVING_LICENSE = 'driving_license'
}

export interface BureaucraticTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: TaskStatus;
  userId: string;
  dependencies: string[];
  requiredDocuments: DocumentType[];
  officialPortals: string[];
  estimatedDuration: number; // in days
  deadline?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata: TaskMetadata;
}

export enum TaskType {
  NIE_APPLICATION = 'nie_application',
  TIE_RENEWAL = 'tie_renewal',
  EMPADRONAMIENTO = 'empadronamiento',
  SIP_REGISTRATION = 'sip_registration',
  BANK_ACCOUNT = 'bank_account',
  DRIVING_LICENSE_EXCHANGE = 'driving_license_exchange',
  TAX_DECLARATION = 'tax_declaration',
  SOCIAL_SECURITY = 'social_security',
  WORK_PERMIT = 'work_permit',
  FAMILY_REUNION = 'family_reunion'
}

export enum TaskStatus {
  NOT_STARTED = 'not_started',
  DOCUMENTS_NEEDED = 'documents_needed',
  READY_TO_SUBMIT = 'ready_to_submit',
  APPOINTMENT_NEEDED = 'appointment_needed',
  APPOINTMENT_SCHEDULED = 'appointment_scheduled',
  IN_PROGRESS = 'in_progress',
  WAITING_RESPONSE = 'waiting_response',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export interface TaskMetadata {
  officeName?: string;
  appointmentDate?: Date;
  applicationNumber?: string;
  fees?: number;
  estimatedProcessingTime?: number;
  nextSteps?: string[];
  formTemplates?: FormTemplate[];
}

export interface FormTemplate {
  id: string;
  name: string;
  url: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  type: 'text' | 'date' | 'select' | 'checkbox' | 'file';
  required: boolean;
  validation?: string;
  options?: string[];
  mappedDocument?: DocumentType;
  extractionPath?: string;
}

export interface CitaWatcher {
  id: string;
  userId: string;
  taskId: string;
  portalUrl: string;
  location: string;
  preferredDates: Date[];
  preferredTimes: string[];
  isActive: boolean;
  lastChecked: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  taskId?: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export enum NotificationType {
  TASK_REMINDER = 'task_reminder',
  DEADLINE_WARNING = 'deadline_warning',
  APPOINTMENT_AVAILABLE = 'appointment_available',
  DOCUMENT_EXPIRING = 'document_expiring',
  OFFICIAL_NOTIFICATION = 'official_notification',
  SYSTEM_UPDATE = 'system_update'
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  context?: TaskType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    taskReferences?: string[];
    documentReferences?: string[];
    formTemplates?: string[];
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}