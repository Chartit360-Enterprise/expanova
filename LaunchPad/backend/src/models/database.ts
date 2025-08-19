import { Pool, PoolClient } from 'pg';
import * as crypto from 'crypto';

export class Database {
  private pool: Pool;
  private encryptionKey: string;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.encryptionKey = process.env.ENCRYPTION_KEY || '';
    
    if (!this.encryptionKey) {
      console.warn('WARNING: No encryption key provided. Data will not be encrypted.');
    }

    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const client = await this.pool.connect();
      
      // Create tables if they don't exist
      await this.createTables(client);
      
      client.release();
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
    }
  }

  private async createTables(client: PoolClient): Promise<void> {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        nationality VARCHAR(100),
        visa_type VARCHAR(50),
        family_situation VARCHAR(50),
        move_in_date DATE,
        has_children BOOLEAN DEFAULT FALSE,
        is_working BOOLEAN DEFAULT FALSE,
        profile JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(100) NOT NULL,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'not_started',
        dependencies JSONB DEFAULT '[]',
        required_documents JSONB DEFAULT '[]',
        official_portals JSONB DEFAULT '[]',
        estimated_duration INTEGER,
        deadline TIMESTAMP WITH TIME ZONE,
        completed_at TIMESTAMP WITH TIME ZONE,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createDocumentsTable = `
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(100) NOT NULL,
        file_name VARCHAR(500) NOT NULL,
        encrypted_path TEXT NOT NULL,
        extracted_data JSONB DEFAULT '{}',
        expiry_date DATE,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createChatSessionsTable = `
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        context JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createChatMessagesTable = `
      CREATE TABLE IF NOT EXISTS chat_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        metadata JSONB DEFAULT '{}',
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createCitaWatchersTable = `
      CREATE TABLE IF NOT EXISTS cita_watchers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
        portal_url TEXT NOT NULL,
        location VARCHAR(100) DEFAULT 'Valencia',
        preferred_dates JSONB DEFAULT '[]',
        preferred_times JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT TRUE,
        last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createNotificationsTable = `
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        priority VARCHAR(20) DEFAULT 'medium',
        is_read BOOLEAN DEFAULT FALSE,
        action_url TEXT,
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Create indexes for better performance
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
      CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
      CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
      CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_cita_watchers_user_id ON cita_watchers(user_id);
      CREATE INDEX IF NOT EXISTS idx_cita_watchers_active ON cita_watchers(is_active);
      CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
      CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read) WHERE is_read = FALSE;
    `;

    // Execute table creation
    await client.query(createUsersTable);
    await client.query(createTasksTable);
    await client.query(createDocumentsTable);
    await client.query(createChatSessionsTable);
    await client.query(createChatMessagesTable);
    await client.query(createCitaWatchersTable);
    await client.query(createNotificationsTable);
    
    // Create indexes
    await client.query(createIndexes);

    console.log('📊 Database tables created successfully');
  }

  // Encryption helpers
  private encrypt(text: string): string {
    if (!this.encryptionKey) return text;
    
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, this.encryptionKey);
    
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    return JSON.stringify({
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      encrypted: encrypted.toString('hex'),
    });
  }

  private decrypt(encryptedData: string): string {
    if (!this.encryptionKey) return encryptedData;
    
    try {
      const data = JSON.parse(encryptedData);
      const algorithm = 'aes-256-gcm';
      const decipher = crypto.createDecipher(algorithm, this.encryptionKey);
      
      decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));
      
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(data.encrypted, 'hex')),
        decipher.final()
      ]);
      
      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }

  // Generic query method
  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  // Transaction support
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // User operations
  async createUser(userData: any): Promise<any> {
    const query = `
      INSERT INTO users (email, password_hash, nationality, visa_type, family_situation, 
                        move_in_date, has_children, is_working, profile)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, email, nationality, visa_type, family_situation, move_in_date, 
                has_children, is_working, profile, created_at, updated_at
    `;
    
    const values = [
      userData.email,
      userData.passwordHash,
      userData.nationality,
      userData.visaType,
      userData.familySituation,
      userData.moveInDate,
      userData.hasChildren,
      userData.isWorking,
      JSON.stringify(userData.profile)
    ];

    const result = await this.query(query, values);
    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await this.query(query, [email]);
    return result.rows[0];
  }

  async getUserById(id: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await this.query(query, [id]);
    return result.rows[0];
  }

  // Task operations
  async createTask(taskData: any): Promise<any> {
    const query = `
      INSERT INTO tasks (user_id, type, title, description, priority, status, 
                        dependencies, required_documents, official_portals, 
                        estimated_duration, deadline, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    
    const values = [
      taskData.userId,
      taskData.type,
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.status,
      JSON.stringify(taskData.dependencies || []),
      JSON.stringify(taskData.requiredDocuments || []),
      JSON.stringify(taskData.officialPortals || []),
      taskData.estimatedDuration,
      taskData.deadline,
      JSON.stringify(taskData.metadata || {})
    ];

    const result = await this.query(query, values);
    return result.rows[0];
  }

  async getUserTasks(userId: string): Promise<any[]> {
    const query = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await this.query(query, [userId]);
    return result.rows;
  }

  async updateTaskStatus(taskId: string, status: string): Promise<any> {
    const query = `
      UPDATE tasks 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await this.query(query, [status, taskId]);
    return result.rows[0];
  }

  // Document operations
  async createDocument(documentData: any): Promise<any> {
    const query = `
      INSERT INTO documents (user_id, type, file_name, encrypted_path, extracted_data, expiry_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      documentData.userId,
      documentData.type,
      documentData.fileName,
      documentData.encryptedPath,
      JSON.stringify(documentData.extractedData || {}),
      documentData.expiryDate
    ];

    const result = await this.query(query, values);
    return result.rows[0];
  }

  async getUserDocuments(userId: string): Promise<any[]> {
    const query = 'SELECT * FROM documents WHERE user_id = $1 ORDER BY uploaded_at DESC';
    const result = await this.query(query, [userId]);
    return result.rows;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Cleanup method
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Singleton instance
export const database = new Database();