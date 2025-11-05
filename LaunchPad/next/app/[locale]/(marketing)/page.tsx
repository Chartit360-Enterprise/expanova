import { Metadata } from 'next';
import { ExpanovaHome } from './expanova/ExpanovaHome';

export const metadata: Metadata = {
  title: 'Expanova',
  description: 'Expanding what\'s possible through AI-powered tools, strategic investments, and rapid development.',
  keywords: ['innovation', 'ai', 'startup', 'evaluation', 'criterion', 'development'],
};

export default function HomePage() {
  return <ExpanovaHome />;
}
