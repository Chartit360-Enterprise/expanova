import { Metadata } from 'next';
import { TaskDashboard } from '../../../../components/expanova/task-dashboard';
import { BuroChatWidget } from '../../../../components/expanova/buro-chat';

export const metadata: Metadata = {
  title: 'Dashboard - Expanova',
  description: 'Track your progress through Spanish bureaucratic processes with AI-powered assistance.',
};

export default function DashboardPage() {
  return (
    <div>
      <TaskDashboard />
      <BuroChatWidget />
    </div>
  );
}