import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Expanova - AI Bureaucracy Assistant for Valencia',
  description: 'Navigate Spanish bureaucracy with ease. Get personalized roadmaps, automated document processing, appointment monitoring, and expert AI guidance for expats in Valencia.',
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  // Redirect to Expanova homepage
  redirect(`/${params.locale}/expanova`);
}
