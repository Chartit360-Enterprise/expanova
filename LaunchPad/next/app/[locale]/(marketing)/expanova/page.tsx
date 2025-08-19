import { Metadata } from 'next';
import { ExpanovaHome } from './ExpanovaHome';

export const metadata: Metadata = {
  title: 'Expanova - AI Bureaucracy Assistant for Valencia',
  description: 'Navigate Spanish bureaucracy with ease. Get personalized roadmaps, automated document processing, appointment monitoring, and expert AI guidance for expats in Valencia.',
  keywords: ['spain', 'bureaucracy', 'nie', 'empadronamiento', 'valencia', 'expat', 'ai assistant'],
};

export default function ExpanovaPage() {
  return <ExpanovaHome />;
}