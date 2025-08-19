import { OpenAI } from 'openai';
import { ChatSession, ChatMessage, TaskType, BureaucraticTask, User } from '../types/shared';

interface ChatContext {
  user: User;
  activeTasks: BureaucraticTask[];
  recentMessages: ChatMessage[];
  sessionContext?: TaskType[];
}

interface KnowledgeBase {
  procedures: Record<string, ProcedureGuide>;
  faqs: FAQ[];
  legalTexts: LegalReference[];
  formGuides: FormGuide[];
}

interface ProcedureGuide {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  requirements: string[];
  steps: string[];
  commonIssues: string[];
  officialLinks: string[];
  estimatedTime: string;
  fees: string;
  lastUpdated: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  relatedTasks: TaskType[];
}

interface LegalReference {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  source: string;
  applicableFor: TaskType[];
}

interface FormGuide {
  id: string;
  formName: string;
  formUrl: string;
  instructions: string[];
  commonMistakes: string[];
  relatedTask: TaskType;
}

export class BuroChatService {
  private openai: OpenAI;
  private knowledgeBase: KnowledgeBase;
  private systemPrompt: string;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });

    this.knowledgeBase = this.initializeKnowledgeBase();
    this.systemPrompt = this.buildSystemPrompt();
  }

  private initializeKnowledgeBase(): KnowledgeBase {
    return {
      procedures: {
        [TaskType.NIE_APPLICATION]: {
          id: 'nie-application',
          type: TaskType.NIE_APPLICATION,
          title: 'NIE Application Process',
          description: 'Complete guide for obtaining your Número de Identificación de Extranjero (NIE)',
          requirements: [
            'Valid passport',
            'Completed form EX-15',
            'Proof of reasons for application (rental contract, work contract, etc.)',
            'Payment of fee (€10.71)',
            'Appointment confirmation'
          ],
          steps: [
            'Fill out form EX-15 online or download PDF version',
            'Book appointment at police station via https://sede.policia.gob.es',
            'Pay the fee (modelo 790 código 012)',
            'Gather all required documents',
            'Attend appointment with original documents',
            'Collect NIE certificate (usually same day)'
          ],
          commonIssues: [
            'Appointments are often fully booked - use our appointment watcher',
            'Form EX-15 must be filled completely and signed',
            'Fee payment receipt is mandatory - dont lose it',
            'All foreign documents may need apostille/translation'
          ],
          officialLinks: [
            'https://sede.policia.gob.es',
            'https://www.policia.es/documentacion/nie/nie.html'
          ],
          estimatedTime: '1-2 weeks from application to receipt',
          fees: '€10.71 (modelo 790)',
          lastUpdated: new Date('2024-01-01')
        },
        [TaskType.EMPADRONAMIENTO]: {
          id: 'empadronamiento',
          type: TaskType.EMPADRONAMIENTO,
          title: 'Municipal Registration (Empadronamiento)',
          description: 'Register your residence with Valencia city council',
          requirements: [
            'Valid passport or NIE',
            'Rental contract or property deed',
            'Completed empadronamiento form',
            'Landlord authorization (if renting)'
          ],
          steps: [
            'Download empadronamiento form from Valencia council website',
            'Complete form with personal and address details',
            'Get landlord to sign authorization if renting',
            'Visit Oficina de Atención al Ciudadano (OAC)',
            'Submit documents and form',
            'Receive empadronamiento certificate'
          ],
          commonIssues: [
            'Landlord may be reluctant to sign - its their legal obligation',
            'Address must match exactly on rental contract',
            'Some OACs require appointment, others accept walk-ins',
            'Certificate is valid for 6 months for most procedures'
          ],
          officialLinks: [
            'https://www.valencia.es/ayuntamiento/webs/sede_electronica/'
          ],
          estimatedTime: 'Same day service at most offices',
          fees: 'Free',
          lastUpdated: new Date('2024-01-01')
        },
        // Add more procedures as needed...
      },
      faqs: [
        {
          id: 'nie-vs-tie',
          question: 'What\'s the difference between NIE and TIE?',
          answer: 'NIE is just the number assigned to you, while TIE is the physical card. If youre staying longer than 6 months, youll need the TIE card after getting your NIE.',
          category: 'identification',
          tags: ['nie', 'tie', 'identification'],
          relatedTasks: [TaskType.NIE_APPLICATION, TaskType.TIE_RENEWAL]
        },
        {
          id: 'bank-account-nie',
          question: 'Can I open a bank account without NIE?',
          answer: 'Some banks allow opening with just passport, but most require NIE. BBVA, Santander, and N26 are more flexible with non-residents.',
          category: 'banking',
          tags: ['bank account', 'nie', 'non-resident'],
          relatedTasks: [TaskType.BANK_ACCOUNT, TaskType.NIE_APPLICATION]
        },
        {
          id: 'empadronamiento-landlord',
          question: 'My landlord refuses to help with empadronamiento. What can I do?',
          answer: 'By law, landlords must provide authorization for empadronamiento. You can report them to consumer protection or find alternative accommodation.',
          category: 'housing',
          tags: ['empadronamiento', 'landlord', 'rights'],
          relatedTasks: [TaskType.EMPADRONAMIENTO]
        }
      ],
      legalTexts: [],
      formGuides: []
    };
  }

  private buildSystemPrompt(): string {
    return `
You are BuroChat, an AI assistant specialized in Spanish bureaucracy for expats living in Valencia. Your role is to help users navigate administrative procedures, understand legal requirements, and complete paperwork efficiently.

CORE CAPABILITIES:
- Provide step-by-step guidance for bureaucratic procedures
- Explain Spanish legal requirements in plain language
- Help troubleshoot common issues with applications
- Recommend the best offices and appointment times
- Clarify form requirements and help with document preparation
- Explain deadlines and consequences of missing them

RESPONSE STYLE:
- Be practical and actionable
- Use simple, clear language
- Always provide specific next steps
- Include relevant links and phone numbers
- Warn about common pitfalls
- Be empathetic - bureaucracy is stressful

LIMITATIONS:
- You cannot make appointments for users
- You cannot provide legal advice - only explain procedures
- Always recommend consulting official sources for final confirmation
- When unsure, direct users to official offices

SAFETY:
- Never recommend circumventing legal procedures
- Always emphasize the importance of having proper documentation
- Warn about scams and fake gestors
- Recommend only official government portals

For each response, consider the user's visa type, nationality, family situation, and current task progress to provide personalized guidance.
`;
  }

  async processMessage(
    message: string,
    context: ChatContext
  ): Promise<ChatMessage> {
    try {
      // Build context-aware prompt
      const contextualPrompt = this.buildContextualPrompt(message, context);
      
      // Search knowledge base for relevant information
      const relevantKnowledge = this.searchKnowledgeBase(message, context);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'system', content: this.formatKnowledgeContext(relevantKnowledge) },
          { role: 'system', content: contextualPrompt },
          ...context.recentMessages.slice(-6).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I could not process your request. Please try again.';

      // Extract metadata from response
      const metadata = this.extractResponseMetadata(response, context);

      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        metadata
      };

    } catch (error) {
      console.error('Error processing chat message:', error);
      
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment, or contact the official offices directly for urgent matters.',
        timestamp: new Date(),
      };
    }
  }

  private buildContextualPrompt(message: string, context: ChatContext): string {
    const { user, activeTasks } = context;
    
    let prompt = `USER CONTEXT:
- Nationality: ${user.nationality}
- Visa Type: ${user.visaType}
- Family Situation: ${user.familySituation}
- Has Children: ${user.hasChildren}
- Is Working: ${user.isWorking}
- Move-in Date: ${user.moveInDate.toDateString()}
- Preferred Language: ${user.profile.preferredLanguage}

ACTIVE TASKS:
${activeTasks.map(task => 
  `- ${task.title} (Status: ${task.status}, Priority: ${task.priority})`
).join('\n')}

`;

    // Add document status
    const uploadedDocs = user.profile.documents.map(doc => doc.type).join(', ');
    if (uploadedDocs) {
      prompt += `UPLOADED DOCUMENTS: ${uploadedDocs}\n`;
    }

    // Add location context
    prompt += `LOCATION: Valencia, Spain\n`;

    return prompt;
  }

  private searchKnowledgeBase(message: string, context: ChatContext): any {
    const messageLower = message.toLowerCase();
    const relevantInfo: any = {
      procedures: [],
      faqs: [],
      forms: []
    };

    // Search procedures
    for (const [key, procedure] of Object.entries(this.knowledgeBase.procedures)) {
      if (messageLower.includes(key.toLowerCase()) || 
          messageLower.includes(procedure.title.toLowerCase()) ||
          procedure.description.toLowerCase().includes(messageLower.split(' ')[0])) {
        relevantInfo.procedures.push(procedure);
      }
    }

    // Search FAQs
    for (const faq of this.knowledgeBase.faqs) {
      if (messageLower.includes(faq.question.toLowerCase()) ||
          faq.tags.some(tag => messageLower.includes(tag.toLowerCase()))) {
        relevantInfo.faqs.push(faq);
      }
    }

    // Add context from active tasks
    for (const task of context.activeTasks) {
      if (this.knowledgeBase.procedures[task.type]) {
        relevantInfo.procedures.push(this.knowledgeBase.procedures[task.type]);
      }
    }

    return relevantInfo;
  }

  private formatKnowledgeContext(knowledge: any): string {
    let context = 'RELEVANT KNOWLEDGE:\n\n';

    if (knowledge.procedures.length > 0) {
      context += 'PROCEDURES:\n';
      for (const proc of knowledge.procedures.slice(0, 2)) {
        context += `- ${proc.title}: ${proc.description}\n`;
        context += `  Requirements: ${proc.requirements.join(', ')}\n`;
        context += `  Common Issues: ${proc.commonIssues.join('; ')}\n`;
      }
      context += '\n';
    }

    if (knowledge.faqs.length > 0) {
      context += 'FREQUENTLY ASKED:\n';
      for (const faq of knowledge.faqs.slice(0, 3)) {
        context += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
      }
    }

    return context;
  }

  private extractResponseMetadata(response: string, context: ChatContext): any {
    const metadata: any = {
      taskReferences: [],
      documentReferences: [],
      formTemplates: []
    };

    // Extract task references
    for (const task of context.activeTasks) {
      if (response.toLowerCase().includes(task.title.toLowerCase()) ||
          response.toLowerCase().includes(task.type.toLowerCase())) {
        metadata.taskReferences.push(task.id);
      }
    }

    // Extract document references
    const documentTypes = Object.values(context.user.profile.documents).map(doc => doc.type);
    for (const docType of documentTypes) {
      if (response.toLowerCase().includes(docType.toLowerCase())) {
        metadata.documentReferences.push(docType);
      }
    }

    // Extract form references
    const formPatterns = [
      /form\s+([A-Z]+-\d+)/gi,
      /modelo\s+(\d+)/gi,
      /formulario\s+([A-Z]+-\d+)/gi
    ];

    for (const pattern of formPatterns) {
      const matches = response.match(pattern);
      if (matches) {
        metadata.formTemplates.push(...matches);
      }
    }

    return Object.keys(metadata).some(key => metadata[key].length > 0) ? metadata : undefined;
  }

  async suggestFollowUpQuestions(context: ChatContext): Promise<string[]> {
    const { user, activeTasks } = context;
    const suggestions: string[] = [];

    // Task-specific suggestions
    for (const task of activeTasks.slice(0, 2)) {
      switch (task.type) {
        case TaskType.NIE_APPLICATION:
          if (task.status === 'documents_needed') {
            suggestions.push('What documents do I need for NIE application?');
          } else if (task.status === 'appointment_needed') {
            suggestions.push('How can I get a NIE appointment faster?');
          }
          break;
        
        case TaskType.EMPADRONAMIENTO:
          suggestions.push('My landlord won\'t help with empadronamiento, what are my options?');
          break;
        
        case TaskType.BANK_ACCOUNT:
          suggestions.push('Which Spanish banks are easiest for foreigners?');
          break;
      }
    }

    // General suggestions based on user profile
    if (user.hasChildren) {
      suggestions.push('How do I register my children for Spanish school?');
    }

    if (user.isWorking) {
      suggestions.push('What are my tax obligations in Spain?');
    }

    // Add some common questions
    suggestions.push(
      'How long does bureaucratic process usually take in Valencia?',
      'What should I do if I made a mistake on my application?',
      'Are there any upcoming deadline I should know about?'
    );

    return suggestions.slice(0, 4); // Return top 4 suggestions
  }

  async analyzeSentiment(message: string): Promise<'frustrated' | 'confused' | 'urgent' | 'neutral'> {
    const frustratedWords = ['frustrated', 'angry', 'ridiculous', 'impossible', 'stupid', 'hate'];
    const confusedWords = ['confused', 'don\'t understand', 'unclear', 'what does', 'explain'];
    const urgentWords = ['urgent', 'asap', 'quickly', 'deadline', 'expires', 'emergency'];

    const messageLower = message.toLowerCase();

    if (frustratedWords.some(word => messageLower.includes(word))) {
      return 'frustrated';
    } else if (urgentWords.some(word => messageLower.includes(word))) {
      return 'urgent';
    } else if (confusedWords.some(word => messageLower.includes(word))) {
      return 'confused';
    }

    return 'neutral';
  }

  async detectSpam(message: string): Promise<boolean> {
    const spamIndicators = [
      /free\s+money/gi,
      /guaranteed\s+visa/gi,
      /skip\s+the\s+line/gi,
      /immediate\s+approval/gi,
      /contact\s+my\s+friend/gi,
      /special\s+deal/gi
    ];

    return spamIndicators.some(pattern => pattern.test(message));
  }

  // Method to update knowledge base from external sources
  async updateKnowledgeBase(): Promise<void> {
    // This would fetch updates from official sources
    // Implementation depends on available APIs and data sources
    console.log('Knowledge base update would be implemented here');
  }
}