"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../elements/button";

interface BureaucraticTask {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  dueDate: string;
  requiredDocuments: string[];
  dependencies: string[];
  officialPortalUrl?: string;
  nextSteps: string[];
  progress: number;
}

interface TaskDashboardProps {
  userId?: string;
}

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-cursor-bg to-cursor-sidebar">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-9 bg-cursor-panel rounded-lg w-80"></div>
            <div className="h-5 bg-cursor-selection rounded w-96"></div>
          </div>
          <div className="h-12 w-12 bg-cursor-panel rounded-xl"></div>
        </div>
        
        <div className="bg-cursor-panel/20 backdrop-blur-sm rounded-2xl p-8 border border-cursor-border/30">
          <div className="h-6 bg-cursor-selection rounded w-48 mb-6"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-cursor-selection/20 rounded-xl p-4">
                <div className="h-8 bg-cursor-border rounded w-12 mb-2 mx-auto"></div>
                <div className="h-4 bg-cursor-border rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-cursor-panel/20 backdrop-blur-sm rounded-2xl p-6 border border-cursor-border/30">
              <div className="h-6 bg-cursor-selection rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-cursor-border rounded w-full"></div>
                <div className="h-4 bg-cursor-border rounded w-2/3"></div>
              </div>
              <div className="h-10 bg-cursor-selection/50 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          color: 'text-cursor-success', 
          bg: 'bg-cursor-success/10', 
          border: 'border-cursor-success/20',
          icon: '✓',
          label: 'Complete'
        };
      case 'in_progress':
        return { 
          color: 'text-cursor-accent', 
          bg: 'bg-cursor-accent/10', 
          border: 'border-cursor-accent/20',
          icon: '●',
          label: 'Active'
        };
      case 'blocked':
        return { 
          color: 'text-cursor-error', 
          bg: 'bg-cursor-error/10', 
          border: 'border-cursor-error/20',
          icon: '⚠',
          label: 'Blocked'
        };
      default:
        return { 
          color: 'text-cursor-text-dim', 
          bg: 'bg-cursor-selection/30', 
          border: 'border-cursor-border',
          icon: '○',
          label: 'Pending'
        };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}>
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { 
          color: 'text-cursor-error', 
          bg: 'bg-cursor-error/10', 
          border: 'border-cursor-error/20',
          label: 'Urgent'
        };
      case 'high':
        return { 
          color: 'text-cursor-warning', 
          bg: 'bg-cursor-warning/10', 
          border: 'border-cursor-warning/20',
          label: 'High'
        };
      case 'medium':
        return { 
          color: 'text-cursor-accent', 
          bg: 'bg-cursor-accent/10', 
          border: 'border-cursor-accent/20',
          label: 'Medium'
        };
      case 'low':
        return { 
          color: 'text-cursor-success', 
          bg: 'bg-cursor-success/10', 
          border: 'border-cursor-success/20',
          label: 'Low'
        };
      default:
        return { 
          color: 'text-cursor-text-dim', 
          bg: 'bg-cursor-selection', 
          border: 'border-cursor-border',
          label: 'Normal'
        };
    }
  };

  const config = getPriorityConfig(priority);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}>
      {config.label}
    </span>
  );
};

const TaskCard = ({ task, index }: { task: BureaucraticTask; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(task.dueDate);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cursor-accent/20 to-cursor-success/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      
      <div className="relative bg-cursor-panel/40 backdrop-blur-sm border border-cursor-border/30 rounded-2xl p-6 transition-all duration-300 hover:border-cursor-accent/30 hover:shadow-2xl hover:shadow-cursor-accent/5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-cursor-text text-lg leading-tight mb-3 group-hover:text-cursor-accent transition-colors">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-cursor-text-dim hover:text-cursor-accent cursor-pointer"
          >
            ⚡
          </motion.div>
        </div>

        <p className="text-cursor-text-dim text-sm leading-relaxed mb-4">
          {task.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cursor-text-dim">Due date</span>
            <span className={`font-medium ${daysLeft <= 7 ? 'text-cursor-error' : daysLeft <= 14 ? 'text-cursor-warning' : 'text-cursor-text-dim'}`}>
              {new Date(task.dueDate).toLocaleDateString()} 
              <span className="ml-1 text-xs">
                ({daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`})
              </span>
            </span>
          </div>

          {task.requiredDocuments.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-cursor-text-dim">Required documents</span>
              <div className="flex flex-wrap gap-1.5">
                {task.requiredDocuments.slice(0, 3).map((doc, i) => (
                  <span key={i} className="inline-block px-2 py-1 bg-cursor-selection/50 text-cursor-text text-xs rounded-md">
                    {doc.replace('_', ' ')}
                  </span>
                ))}
                {task.requiredDocuments.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-cursor-selection/30 text-cursor-text-dim text-xs rounded-md">
                    +{task.requiredDocuments.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {task.progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-cursor-text-dim">Progress</span>
                <span className="text-cursor-text font-medium">{task.progress}%</span>
              </div>
              <div className="w-full bg-cursor-selection/30 rounded-full h-1.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-cursor-accent to-cursor-success h-1.5 rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-cursor-border/30">
          <Button className="px-4 py-2 bg-cursor-accent hover:bg-cursor-accent/80 text-white text-sm rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cursor-accent/20">
            {task.status === 'completed' ? 'View Details' : 'Continue'}
          </Button>
          
          {task.officialPortalUrl && (
            <a 
              href={task.officialPortalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cursor-text-dim hover:text-cursor-accent transition-colors p-2 hover:bg-cursor-selection/30 rounded-lg"
              title="Official portal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const TaskDashboard: React.FC<TaskDashboardProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<BureaucraticTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const result = await response.json();
        
        if (result.success && result.data?.tasks) {
          const transformedTasks = result.data.tasks.map((task: any) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status === 'documents_needed' ? 'not_started' : task.status,
            dueDate: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : "2024-12-26",
            requiredDocuments: task.requiredDocuments || [],
            dependencies: task.dependencies || [],
            officialPortalUrl: task.officialPortals?.[0] || "",
            nextSteps: task.metadata?.nextSteps || ["Continue with this task"],
            progress: task.status === 'completed' ? 100 : task.status === 'in_progress' ? 50 : 0
          }));
          
          setTasks(transformedTasks);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cursor-bg via-cursor-sidebar to-cursor-bg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-cursor-text mb-3 bg-gradient-to-r from-cursor-text to-cursor-accent bg-clip-text">
              Your Spanish Bureaucracy
            </h1>
            <p className="text-cursor-text-dim text-lg">
              Track your progress through administrative processes
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 w-12 bg-cursor-accent/10 border border-cursor-accent/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-cursor-accent/20 transition-colors"
          >
            <span className="text-cursor-accent text-lg">⚡</span>
          </motion.div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cursor-panel/20 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-cursor-border/30 hover:border-cursor-accent/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-cursor-text">Progress Overview</h2>
            <div className="text-right">
              <div className="text-4xl font-bold text-cursor-accent">{progressPercentage}%</div>
              <div className="text-sm text-cursor-text-dim">Complete</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm text-cursor-text-dim mb-3">
              <span>Overall Progress</span>
              <span>{completedTasks} of {totalTasks} tasks completed</span>
            </div>
            <div className="w-full bg-cursor-selection/30 rounded-full h-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="bg-gradient-to-r from-cursor-accent to-cursor-success h-3 rounded-full shadow-lg shadow-cursor-accent/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-cursor-success/10 rounded-xl border border-cursor-success/20 hover:border-cursor-success/30 transition-all cursor-pointer"
            >
              <div className="text-3xl font-bold text-cursor-success mb-1">{completedTasks}</div>
              <div className="text-sm text-cursor-success font-medium">Completed</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-cursor-accent/10 rounded-xl border border-cursor-accent/20 hover:border-cursor-accent/30 transition-all cursor-pointer"
            >
              <div className="text-3xl font-bold text-cursor-accent mb-1">{inProgressTasks}</div>
              <div className="text-sm text-cursor-accent font-medium">In Progress</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-cursor-error/10 rounded-xl border border-cursor-error/20 hover:border-cursor-error/30 transition-all cursor-pointer"
            >
              <div className="text-3xl font-bold text-cursor-error mb-1">{urgentTasks}</div>
              <div className="text-sm text-cursor-error font-medium">Urgent</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-cursor-selection/50 rounded-xl border border-cursor-border hover:border-cursor-text-dim/50 transition-all cursor-pointer"
            >
              <div className="text-3xl font-bold text-cursor-text-dim mb-1">{totalTasks - completedTasks - inProgressTasks}</div>
              <div className="text-sm text-cursor-text-dim font-medium">Pending</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        {tasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-cursor-text mb-2">No tasks yet</h3>
            <p className="text-cursor-text-dim">Your bureaucratic roadmap will appear here once we have your information.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};