import { Metadata } from 'next';
import GuestPageClient from './client';

export const metadata: Metadata = {
  title: 'Our Wedding Day | Roberta & Michael',
  description: 'Join us in celebrating our special day',
};

// This function tells Next.js which dynamic routes to pre-render
export function generateStaticParams() {
  // Add all your guest names here
  return [
    { slug: 'angelique' },
    { slug: 'john' },
    { slug: 'jane' }
    // Add more guests as needed
  ];
}

export default function GuestPage({ params }: { params: { slug: string } }) {
  return <GuestPageClient slug={params.slug} />;
}