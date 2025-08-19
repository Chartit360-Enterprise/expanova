import { unstable_noStore as noStore } from 'next/cache';

export function strapiImage(url: string): string {
  noStore();
  
  // For our Expanova demo, just return the URL as-is if it starts with /
  // This avoids server-side document access and API URL requirements
  if (url.startsWith("/")) {
    return url;
  }
  
  return url;
}