"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InvitationEnvelopeProps {
  guestName: string;
  isOpened: boolean;
  onOpen: () => void;
  onReveal: () => void;
}

export default function InvitationEnvelope({
  guestName,
  isOpened: externalIsOpened,
  onOpen,
  onReveal,
}: InvitationEnvelopeProps) {
  // Add state to control initial rendering
  const [isClient, setIsClient] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const router = useRouter();

  // Wait for client-side rendering before showing anything
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-open the envelope without user input
  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(() => {
      setEnvelopeOpen(true);

      // Allow time for the animation to complete before triggering onOpen
      setTimeout(() => {
        setAnimationComplete(true);
        onOpen();
      }, 1750);
    }, 750);

    return () => clearTimeout(timer);
  }, [isClient, onOpen]);

  // Don't render anything until client-side renders
  if (!isClient) {
    return null;
  }

  // Always use our internal flag to determine what to show
  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-50 p-4">
      <div className="envelope-container">
        <div className={`letter-image ${envelopeOpen ? "opened" : ""}`}>
          <div className="animated-mail">
            <div className="back-fold"></div>
            <div className="letter">
              <div className="letter-content">
                <div className="invitation-border">
                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-8">
                    IT IS WITH JOY THAT WE
                  </p>

                  <p className="text-4xl uppercase tracking-widest text-black font-normal mb-2">
                    ROBERTA
                  </p>

                  <p
                    className="text-4xl italic text-black mb-2 font-light"
                    style={{ fontFamily: "Wild Magnolia, serif" }}
                  >
                    and
                  </p>

                  <p className="text-4xl uppercase tracking-widest text-black font-normal mb-8">
                    MICHAEL
                  </p>

                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-2">
                    WITH THE BLESSING OF OUR PARENTS
                  </p>
                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-3">
                    INVITE YOU
                  </p>

                  {/* Guest name display with styled ampersand */}
                  <p className="text-2xl font-medium text-black mb-3">
                    {guestName.charAt(0).toUpperCase() + guestName.slice(1)}{" "}
                    <span style={{ fontFamily: "Wild Magnolia, serif" }}>
                      &
                    </span>{" "}
                    Guest
                  </p>

                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-2">
                    TO JOIN US
                  </p>
                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-4">
                    IN CELEBRATING OUR MARRIAGE
                  </p>
                  <button
                    onClick={() => {
                      onReveal();
                      router.push('/');
                    }}
                    className="rounded-full bg-sage-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-sage-700"
                  >
                    Open Invitation
                  </button>
                </div>
              </div>
            </div>
            <div className="top-fold"></div>
            <div className="body"></div>
            <div className="left-fold"></div>
          </div>

          {/* Wax seal */}
          <div className={`wax-seal ${animationComplete ? 'hidden' : ''}`}>
            <Image
              src="/images/sage-green-wax-seal.png"
              alt="Wax Seal"
              width={80}
              height={80}
              className="seal-image"
            />
          </div>
        </div>

        {/* CSS for the envelope animation */}
        <style jsx>{`
          .envelope-container {
            position: relative;
            width: 100%;
            height: 800px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: scale(0.8);
          }

          @media screen and (max-width: 600px) {
            .envelope-container {
              transform: scale(0.78) translateY(-60px);
            } 
          }

          .letter-image {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 500px;
            height: 600px;
            transform: translate(-50%, -50%);
            cursor: pointer;
          }

          .animated-mail {
            position: absolute;
            height: 450px;
            width: 500px;
            transition: 0.8s;
            left: 0;
            top: 200px;
          }

          .animated-mail .body {
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 320px 500px;
            border-color: transparent transparent #e0dbd4 transparent;
            z-index: 2;
          }

          .animated-mail .top-fold {
            position: absolute;
            top: 130px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 175px 250px 0 250px;
            transform-origin: 50% 0%;
            transition:
              transform 0.8s 0.8s,
              z-index 0.2s 0.8s;
            border-color: #f0ece7 transparent transparent transparent;
            z-index: 2;
          }

          .animated-mail .back-fold {
            position: absolute;
            bottom: 0;
            width: 500px;
            height: 320px;
            background: #e8e4df;
            z-index: 0;
          }

          .animated-mail .left-fold {
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 160px 0 160px 250px;
            border-color: transparent transparent transparent #e8e4df;
            z-index: 2;
          }

          .animated-mail .letter {
            left: 10px;
            bottom: 160px;
            position: absolute;
            width: 480px;
            height: 0px;
            background: white;
            z-index: 1;
            overflow: hidden;
            transition: 0.8s 0.6s;
            padding: 0;
            box-sizing: border-box;
          }

          .letter-image.opened .animated-mail {
            transform: translateY(50px);
          }

          .letter-image.opened .animated-mail .top-fold {
            transition:
            transform 0.8s,
            z-index 0.6s;
            transform: rotateX(180deg);
            z-index: 0;
          }

          .letter-image.opened .animated-mail .letter {
            height: 700px;
          }

          .letter-content {
            padding-top: 24px;
            font-size: 16px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.8s 0.6s;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .invitation-border {
            border: 1px solid #d3d3d3;
            padding: 80px 20px;
            position: relative;
            width: 90%;
            height: 90%;
            margin: 0 auto;
          }

          .invitation-border:before {
            content: "";
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 1px solid #d3d3d3;
            z-index: -1;
          }

          .letter-image.opened .animated-mail .letter .letter-content {
            opacity: 1;
          }

          /* Wax seal styling */
          .wax-seal {
            position: absolute;
            top: 72%;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.2s;
          }

          .letter-image.opened .wax-seal {
            opacity: 0;
          }
          
          .hidden {
            display: none;
          }

          .seal-image {
            width: 60px;
            height: 60px;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
}
