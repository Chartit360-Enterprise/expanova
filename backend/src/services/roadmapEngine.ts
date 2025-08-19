import { BureaucraticTask, TaskType, TaskStatus, User, DocumentType } from '../types/shared';

interface TaskDefinition {
  type: TaskType;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requiredDocuments: DocumentType[];
  dependencies: TaskType[];
  estimatedDuration: number;
  isRequired: (user: User) => boolean;
  urgencyBoost?: (user: User) => number;
  officialPortals: string[];
}

export class RoadmapEngine {
  private taskDefinitions: TaskDefinition[] = [
    {
      type: TaskType.NIE_APPLICATION,
      title: 'Apply for NIE (Número de Identificación de Extranjero)',
      description: 'Obtain your foreigner identification number, required for most administrative procedures in Spain.',
      priority: 'urgent',
      requiredDocuments: [DocumentType.PASSPORT, DocumentType.RENTAL_CONTRACT],
      dependencies: [],
      estimatedDuration: 14,
      isRequired: (user) => !['eu_citizen'].includes(user.visaType),
      officialPortals: ['https://sede.policia.gob.es', 'https://www.citapreviadnie.es'],
    },
    {
      type: TaskType.EMPADRONAMIENTO,
      title: 'Register with Local Municipality (Empadronamiento)',
      description: 'Register your residence with the local town hall. Required for healthcare, banking, and many other services.',
      priority: 'high',
      requiredDocuments: [DocumentType.PASSPORT, DocumentType.NIE_TIE, DocumentType.RENTAL_CONTRACT],
      dependencies: [TaskType.NIE_APPLICATION],
      estimatedDuration: 7,
      isRequired: () => true,
      officialPortals: ['https://www.valencia.es/ayuntamiento/webs/sede_electronica/'],
    },
    {
      type: TaskType.SIP_REGISTRATION,
      title: 'Register for Healthcare (SIP Card)',
      description: 'Register with the Valencian health system to access public healthcare services.',
      priority: 'high',
      requiredDocuments: [DocumentType.PASSPORT, DocumentType.NIE_TIE, DocumentType.EMPADRONAMIENTO],
      dependencies: [TaskType.EMPADRONAMIENTO],
      estimatedDuration: 10,
      isRequired: () => true,
      officialPortals: ['https://www.san.gva.es/'],
    },
    {
      type: TaskType.BANK_ACCOUNT,
      title: 'Open Spanish Bank Account',
      description: 'Open a bank account for salary deposits, rent payments, and daily transactions.',
      priority: 'high',
      requiredDocuments: [DocumentType.PASSPORT, DocumentType.NIE_TIE, DocumentType.EMPADRONAMIENTO, DocumentType.WORK_CONTRACT],
      dependencies: [TaskType.EMPADRONAMIENTO],
      estimatedDuration: 5,
      isRequired: (user) => user.isWorking || user.visaType === 'work',
      officialPortals: [],
    },
    {
      type: TaskType.SOCIAL_SECURITY,
      title: 'Social Security Registration',
      description: 'Register with the Spanish Social Security system if you are working.',
      priority: 'high',
      requiredDocuments: [DocumentType.NIE_TIE, DocumentType.WORK_CONTRACT],
      dependencies: [TaskType.NIE_APPLICATION],
      estimatedDuration: 7,
      isRequired: (user) => user.isWorking,
      officialPortals: ['https://www.seg-social.es/'],
    },
    {
      type: TaskType.TIE_RENEWAL,
      title: 'Renew TIE Card',
      description: 'Renew your Tarjeta de Identidad de Extranjero before expiration.',
      priority: 'medium',
      requiredDocuments: [DocumentType.NIE_TIE, DocumentType.EMPADRONAMIENTO],
      dependencies: [TaskType.NIE_APPLICATION],
      estimatedDuration: 21,
      isRequired: (user) => {
        // This would be calculated based on TIE expiry date
        return false; // Placeholder logic
      },
      officialPortals: ['https://sede.policia.gob.es'],
    },
    {
      type: TaskType.DRIVING_LICENSE_EXCHANGE,
      title: 'Exchange Foreign Driving License',
      description: 'Exchange your foreign driving license for a Spanish one.',
      priority: 'medium',
      requiredDocuments: [DocumentType.PASSPORT, DocumentType.NIE_TIE, DocumentType.DRIVING_LICENSE, DocumentType.EMPADRONAMIENTO],
      dependencies: [TaskType.EMPADRONAMIENTO],
      estimatedDuration: 30,
      isRequired: (user) => {
        // This would check if user has uploaded a driving license
        return user.profile.documents.some(doc => doc.type === DocumentType.DRIVING_LICENSE);
      },
      officialPortals: ['https://sede.dgt.gob.es/'],
    },
    {
      type: TaskType.TAX_DECLARATION,
      title: 'Annual Tax Declaration (Renta)',
      description: 'File your annual tax declaration with Spanish tax authorities.',
      priority: 'low',
      requiredDocuments: [DocumentType.NIE_TIE, DocumentType.BANK_STATEMENT],
      dependencies: [TaskType.BANK_ACCOUNT],
      estimatedDuration: 14,
      isRequired: (user) => {
        const moveInDate = new Date(user.moveInDate);
        const currentYear = new Date().getFullYear();
        const moveInYear = moveInDate.getFullYear();
        return moveInYear < currentYear && user.isWorking;
      },
      urgencyBoost: (user) => {
        const now = new Date();
        const taxSeason = now.getMonth() >= 3 && now.getMonth() <= 5; // April-June
        return taxSeason ? 2 : 0;
      },
      officialPortals: ['https://www.agenciatributaria.es/'],
    },
  ];

  generatePersonalizedRoadmap(user: User): BureaucraticTask[] {
    const relevantTasks = this.taskDefinitions.filter(def => def.isRequired(user));
    
    const tasks: BureaucraticTask[] = relevantTasks.map(def => {
      let priority = def.priority;
      
      // Apply urgency boost if applicable
      if (def.urgencyBoost) {
        const boost = def.urgencyBoost(user);
        if (boost > 0) {
          const priorities = ['low', 'medium', 'high', 'urgent'];
          const currentIndex = priorities.indexOf(priority);
          const newIndex = Math.min(currentIndex + boost, priorities.length - 1);
          priority = priorities[newIndex] as any;
        }
      }

      // Calculate deadline based on visa type and task urgency
      const deadline = this.calculateDeadline(def, user);

      return {
        id: `${user.id}-${def.type}`,
        type: def.type,
        title: def.title,
        description: def.description,
        priority,
        status: this.determineInitialStatus(def, user),
        userId: user.id,
        dependencies: def.dependencies.map(depType => `${user.id}-${depType}`),
        requiredDocuments: def.requiredDocuments,
        officialPortals: def.officialPortals,
        estimatedDuration: def.estimatedDuration,
        deadline,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          estimatedProcessingTime: def.estimatedDuration,
          nextSteps: this.generateNextSteps(def, user),
        },
      };
    });

    return this.sortByPriorityAndDependencies(tasks);
  }

  private calculateDeadline(def: TaskDefinition, user: User): Date | undefined {
    const moveInDate = new Date(user.moveInDate);
    const now = new Date();

    switch (def.type) {
      case TaskType.NIE_APPLICATION:
        // NIE should be obtained within 3 months for non-EU citizens
        return new Date(Math.max(moveInDate.getTime() + 90 * 24 * 60 * 60 * 1000, now.getTime() + 7 * 24 * 60 * 60 * 1000));
      
      case TaskType.EMPADRONAMIENTO:
        // Empadronamiento should be done immediately after arrival
        return new Date(moveInDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      case TaskType.SIP_REGISTRATION:
        // Healthcare registration within 6 months
        return new Date(moveInDate.getTime() + 180 * 24 * 60 * 60 * 1000);
      
      case TaskType.TAX_DECLARATION:
        // Tax declaration deadline is June 30th
        const currentYear = now.getFullYear();
        return new Date(currentYear, 5, 30); // June 30th
      
      default:
        return undefined;
    }
  }

  private determineInitialStatus(def: TaskDefinition, user: User): TaskStatus {
    // Check if user has all required documents
    const hasAllDocuments = def.requiredDocuments.every(docType =>
      user.profile.documents.some(doc => doc.type === docType)
    );

    if (!hasAllDocuments) {
      return TaskStatus.DOCUMENTS_NEEDED;
    }

    // Check if dependencies are met
    if (def.dependencies.length > 0) {
      // In a real implementation, we'd check if dependency tasks are completed
      return TaskStatus.NOT_STARTED;
    }

    return TaskStatus.READY_TO_SUBMIT;
  }

  private generateNextSteps(def: TaskDefinition, user: User): string[] {
    const steps: string[] = [];

    // Check for missing documents
    const missingDocs = def.requiredDocuments.filter(docType =>
      !user.profile.documents.some(doc => doc.type === docType)
    );

    if (missingDocs.length > 0) {
      steps.push(`Upload required documents: ${missingDocs.join(', ')}`);
    }

    // Add task-specific steps
    switch (def.type) {
      case TaskType.NIE_APPLICATION:
        steps.push('Book appointment at police station or immigration office');
        steps.push('Prepare form EX-15 and pay fees (€10.71)');
        break;
      
      case TaskType.EMPADRONAMIENTO:
        steps.push('Visit local town hall (Ayuntamiento) with required documents');
        steps.push('Complete empadronamiento form and provide proof of residence');
        break;
      
      case TaskType.SIP_REGISTRATION:
        steps.push('Visit Centro de Salud with required documents');
        steps.push('Complete healthcare registration form');
        break;

      case TaskType.BANK_ACCOUNT:
        steps.push('Choose a bank and schedule appointment');
        steps.push('Prepare all required documents and proof of income');
        break;
    }

    return steps;
  }

  private sortByPriorityAndDependencies(tasks: BureaucraticTask[]): BureaucraticTask[] {
    const priorityWeights = { urgent: 4, high: 3, medium: 2, low: 1 };
    
    return tasks.sort((a, b) => {
      // First sort by priority
      const priorityDiff = priorityWeights[b.priority] - priorityWeights[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by number of dependencies (fewer dependencies first)
      const depDiff = a.dependencies.length - b.dependencies.length;
      if (depDiff !== 0) return depDiff;

      // Finally by deadline
      if (a.deadline && b.deadline) {
        return a.deadline.getTime() - b.deadline.getTime();
      }
      if (a.deadline) return -1;
      if (b.deadline) return 1;

      return 0;
    });
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus, tasks: BureaucraticTask[]): BureaucraticTask[] {
    return tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = {
          ...task,
          status: newStatus,
          updatedAt: new Date(),
        };

        if (newStatus === TaskStatus.COMPLETED) {
          updatedTask.completedAt = new Date();
        }

        return updatedTask;
      }
      return task;
    });
  }

  getEligibleTasks(tasks: BureaucraticTask[]): BureaucraticTask[] {
    return tasks.filter(task => {
      if (task.status === TaskStatus.COMPLETED) return false;

      // Check if all dependencies are completed
      const allDependenciesMet = task.dependencies.every(depId =>
        tasks.find(t => t.id === depId)?.status === TaskStatus.COMPLETED
      );

      return allDependenciesMet;
    });
  }

  getTasksNeedingDocuments(tasks: BureaucraticTask[]): BureaucraticTask[] {
    return tasks.filter(task => task.status === TaskStatus.DOCUMENTS_NEEDED);
  }

  getUpcomingDeadlines(tasks: BureaucraticTask[], daysAhead: number = 30): BureaucraticTask[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + daysAhead);

    return tasks.filter(task => 
      task.deadline && 
      task.deadline <= cutoffDate && 
      task.status !== TaskStatus.COMPLETED
    ).sort((a, b) => {
      if (!a.deadline || !b.deadline) return 0;
      return a.deadline.getTime() - b.deadline.getTime();
    });
  }
}