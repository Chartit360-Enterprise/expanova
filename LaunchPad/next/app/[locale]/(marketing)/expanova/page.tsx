import { redirect } from 'next/navigation';

export default async function ExpanovaRedirectPage({ params }: { params: { locale: string } }) {
  // Redirect to root since expanova is now the main site
  redirect(`/${params.locale}`);
}