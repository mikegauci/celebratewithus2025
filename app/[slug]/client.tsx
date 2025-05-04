"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components to reduce initial bundle size
const InvitationEnvelope = dynamic(() => import("@/components/InvitationEnvelope"));
const MainContent = dynamic(() => import("@/components/MainContent"));

export default function GuestPageClient({ slug, companion }: { slug: string; companion?: string }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    <main className="min-h-screen bg-sage-50">
      {!showMainContent ? (
        <InvitationEnvelope
          guestName={slug}
          companion={companion}
          isOpened={isEnvelopeOpened}
          onOpen={() => setIsEnvelopeOpened(true)}
          onReveal={() => setShowMainContent(true)}
        />
      ) : (
        <MainContent />
      )}
    </main>
  );
}