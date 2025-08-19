# Expanova - AI Gestor for Valencia Expats

Expanova is an AI-driven personal assistant that automates bureaucratic tasks for expats living in Valencia, Spain. It helps navigate the complex administrative landscape by providing personalized roadmaps, automated form filling, appointment monitoring, and intelligent chat support.

## 🌟 Features

### Core Functionality
- **Personalized Roadmap**: Dynamic checklist for NIE/TIE, empadronamiento, SIP card, bank accounts, driving license exchange, and tax declarations
- **Document Processing**: OCR and auto-filling of Spanish/Valencian forms with AI extraction
- **Cita Sniper**: Monitors official portals (Policía, DGT, Ayuntamiento, etc.) for appointment availability
- **BuroChat**: AI assistant trained on Spanish administrative guidance and legal texts
- **Notification System**: Automated monitoring of deadlines and official communications
- **Form Auto-fill**: Pre-fill Spanish forms using extracted document data

### Advanced Features
- **Multi-language Support**: English, Spanish, and Catalan
- **Smart Dependencies**: Task management with automatic dependency resolution
- **Appointment Watching**: Real-time monitoring of 4+ official Spanish portals
- **Document Encryption**: GDPR-compliant secure document storage
- **Deadline Tracking**: Automatic notifications for approaching deadlines
- **Progress Visualization**: Beautiful progress dashboards and analytics

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and Framer Motion
- **Backend**: Node.js/Express with TypeScript
- **Database**: PostgreSQL with encrypted document storage
- **AI/ML**: OpenAI GPT-4 for chat and document processing
- **OCR**: Tesseract.js for document text extraction
- **Automation**: Puppeteer for portal monitoring
- **Infrastructure**: Docker, Redis for caching
- **Security**: JWT authentication, AES-256 encryption

### System Design
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Next.js Web    │    │  Mobile App     │    │  Admin Panel    │
│  Frontend       │    │  (Future)       │    │  (Future)       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │    Backend API Server    │
                    │  (Express + TypeScript)  │
                    └─────────────┬─────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
    ┌────▼────┐         ┌────────▼────────┐    ┌────────▼────────┐
    │PostgreSQL│         │     Redis       │    │   File Storage  │
    │Database  │         │     Cache       │    │   (Encrypted)   │
    └─────────┘         └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
expanova/
├── next/                    # Next.js frontend application
│   ├── app/[locale]/       # Internationalized app router
│   │   └── expanova/       # Main Expanova application
│   ├── components/         # Reusable UI components
│   │   └── expanova/       # Expanova-specific components
│   └── types/              # TypeScript type definitions
├── backend/                # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/    # API route handlers
│   │   ├── services/       # Business logic services
│   │   ├── middleware/     # Express middleware
│   │   └── models/         # Database models
│   └── Dockerfile          # Backend container config
├── shared/                 # Shared TypeScript types
├── docs/                   # Project documentation
└── docker-compose.yml     # Multi-service deployment
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- OpenAI API key

### 1. Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd expanova

# Copy environment files
cp backend/.env.example backend/.env
cp next/.env.local.example next/.env.local

# Configure your OpenAI API key
echo "OPENAI_API_KEY=your_openai_key_here" >> backend/.env
```

### 2. Development Setup

#### Option A: Docker (Recommended)
```bash
# Start all services
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Database: localhost:5432
```

#### Option B: Local Development
```bash
# Install backend dependencies
cd backend
npm install
npm run dev

# In another terminal, install frontend dependencies
cd next
npm install
npm run dev
```

### 3. Database Setup
```bash
# Create database and run migrations
docker-compose exec postgres createdb -U expanova expanova
docker-compose exec backend npm run migrate
```

### 4. Access the Application
- **Web App**: http://localhost:3000/expanova
- **API Health**: http://localhost:3001/health
- **Database**: localhost:5432 (user: expanova, db: expanova)

## 📚 User Guide

### Getting Started
1. **Profile Setup**: Complete your nationality, visa type, and family situation
2. **Document Upload**: Upload key documents (passport, rental contract, etc.)
3. **Roadmap Generation**: Get your personalized bureaucratic task list
4. **Task Management**: Track progress and complete tasks step by step
5. **Chat Assistant**: Ask BuroChat for guidance on any procedure

### Key Features

#### 📋 Task Dashboard
- View all bureaucratic tasks with priorities and deadlines
- Track progress with visual indicators
- Get next-step recommendations
- Filter by status, priority, or task type

#### 📄 Document Management
- Upload documents with automatic OCR processing
- Secure encrypted storage
- Smart data extraction for form auto-filling
- Expiration date tracking

#### 🤖 BuroChat AI Assistant
- Ask questions about Spanish bureaucracy
- Get step-by-step guidance
- Understand legal requirements
- Troubleshoot common issues

#### 🎯 Appointment Monitoring
- Automatic monitoring of official portals
- Real-time notifications for available slots
- Support for NIE, driving license, empadronamiento, and more
- Custom preferences for dates and times

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd next && npm test

# E2E tests
npm run test:e2e
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Formatting
npm run format
```

### Building for Production
```bash
# Build all services
docker-compose -f docker-compose.prod.yml up --build

# Or build individually
cd backend && npm run build
cd next && npm run build
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/expanova
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-32-character-encryption-key
OPENAI_API_KEY=your-openai-api-key
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Customization
- **Task Types**: Add new bureaucratic tasks in `backend/src/services/roadmapEngine.ts`
- **Document Types**: Extend document processing in `backend/src/services/documentProcessor.ts`
- **Portal Support**: Add new appointment portals in `backend/src/services/citaWatcher.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security & Privacy

- **Data Encryption**: All documents encrypted at rest using AES-256
- **GDPR Compliance**: Full data export and deletion capabilities
- **Authentication**: JWT-based secure authentication
- **Privacy First**: No data sharing with third parties
- **Local Processing**: OCR and document processing done locally

## 📈 Roadmap

### Phase 1: Core Features ✅
- [x] Personalized task roadmaps
- [x] Document upload and OCR processing
- [x] AI chat assistant
- [x] Appointment monitoring
- [x] Notification system

### Phase 2: Enhanced Features 🚧
- [ ] Mobile application
- [ ] Multi-city support (Madrid, Barcelona)
- [ ] Integration with official APIs
- [ ] Advanced analytics dashboard
- [ ] Community features

### Phase 3: Scale & Growth 📅
- [ ] Multi-language expansion
- [ ] Enterprise partnerships
- [ ] Gestor network integration
- [ ] Premium support services

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Reset database
docker-compose down -v
docker-compose up postgres
```

**OCR Not Working**
- Ensure Tesseract is properly installed
- Check document image quality and format
- Verify file size limits (max 10MB)

**Chat Assistant Errors**
- Verify OpenAI API key is set correctly
- Check API quota and rate limits
- Ensure network connectivity

### Getting Help
- Check existing issues on GitHub
- Join our Discord community
- Contact support at help@expanova.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Valencia city government for open data
- OpenAI for AI capabilities
- Spanish expat community for feedback and testing
- All contributors who made this project possible

---

**Built with ❤️ for the Valencia expat community**

*Making Spanish bureaucracy bearable, one automated task at a time.*