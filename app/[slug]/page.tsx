import { Metadata } from 'next';
import GuestPageClient from './client';
import { guestList, getGuestBySlug } from '../data/guests';

export const metadata: Metadata = {
  title: 'Our Wedding Day | Roberta & Michael',
  description: 'Join us in celebrating our special day',
};

// This function tells Next.js which dynamic routes to pre-render
export function generateStaticParams() {
  // Use the shared guest list
  return guestList;
}

// Define the structure of guest data
export type GuestData = {
  slug: string;
  companion?: string;
};

export default function GuestPage({ params }: { params: { slug: string } }) {
  const guestData = getGuestBySlug(params.slug);
  return <GuestPageClient 
    slug={params.slug} 
    displayName={guestData?.displayName}
    companion={guestData?.companion} 
  />;
}