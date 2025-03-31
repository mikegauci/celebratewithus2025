"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

// Dynamically import components to reduce initial bundle size
const InvitationEnvelope = dynamic(() => import("@/components/InvitationEnvelope"));
const MainContent = dynamic(() => import("@/components/MainContent"));

export default function Home() {
  const params = useParams();
  const guestName = (params?.slug as string) || "";
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  // If no guest name is provided, show main content directly
  useEffect(() => {
    if (!guestName) {
      setShowMainContent(true);
    }
  }, [guestName]);

  if (!guestName) {
    return <MainContent />;
  }

  return (
    <main className="min-h-screen bg-sage-50">
      {!showMainContent ? (
        <InvitationEnvelope
          guestName={guestName}
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