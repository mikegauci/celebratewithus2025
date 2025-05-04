"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from 'styled-components';

interface InvitationEnvelopeProps {
  guestName: string;
  companion?: string;
  isOpened: boolean;
  onOpen: () => void;
  onReveal: () => void;
}

const EnvelopeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);
  
  @media screen and (max-width: 600px) {
    transform: scale(0.78) translateY(-60px);
  }
`;

const LetterImage = styled.div<{ isOpened: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 600px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const AnimatedMail = styled.div<{ isOpened: boolean }>`
  position: absolute;
  height: 450px;
  width: 500px;
  transition: 0.8s;
  left: 0;
  top: 200px;
  transform: ${props => props.isOpened ? 'translateY(50px)' : 'none'};
`;

const Body = styled.div`
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 320px 500px;
  border-color: transparent transparent #e0dbd4 transparent;
  z-index: 2;
`;

const TopFold = styled.div<{ isOpened: boolean }>`
  position: absolute;
  top: 130px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 175px 250px 0 250px;
  transform-origin: 50% 0%;
  transition: ${props => props.isOpened ? 
    'transform 0.8s, z-index 0.6s' : 
    'transform 0.8s 0.8s, z-index 0.2s 0.8s'};
  transform: ${props => props.isOpened ? 'rotateX(180deg)' : 'none'};
  border-color: #f0ece7 transparent transparent transparent;
  z-index: ${props => props.isOpened ? 0 : 2};
`;

const BackFold = styled.div`
  position: absolute;
  bottom: 0;
  width: 500px;
  height: 320px;
  background: #e8e4df;
  z-index: 0;
`;

const LeftFold = styled.div`
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 160px 0 160px 250px;
  border-color: transparent transparent transparent #e8e4df;
  z-index: 2;
`;

const Letter = styled.div<{ isOpened: boolean }>`
  left: 10px;
  bottom: 160px;
  position: absolute;
  width: 480px;
  height: ${props => props.isOpened ? '700px' : '0px'};
  background: white;
  z-index: 1;
  overflow: hidden;
  transition: 0.8s 0.6s;
  padding: 0;
  box-sizing: border-box;
`;

const LetterContent = styled.div<{ isOpened: boolean }>`
  padding-top: 24px;
  font-size: 16px;
  text-align: center;
  opacity: ${props => props.isOpened ? 1 : 0};
  transition: opacity 0.8s 0.6s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InvitationBorder = styled.div`
  border: 1px solid #d3d3d3;
  padding: 80px 20px;
  position: relative;
  width: 90%;
  height: 90%;
  margin: 0 auto;
  
  &:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid #d3d3d3;
    z-index: -1;
  }
`;

const WaxSeal = styled.div<{ isOpened: boolean; hidden: boolean }>`
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  z-index: 10;
  display: ${props => props.hidden ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  opacity: ${props => props.isOpened ? 0 : 1};
`;

const SealImage = styled(Image)`
  width: 60px;
  height: 60px;
  opacity: 1;
`;

const WildMagnoliaText = styled.p`
  font-family: "Wild Magnolia, serif";
`;

export default function InvitationEnvelope({
  guestName,
  companion,
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
      <EnvelopeContainer>
        <LetterImage isOpened={envelopeOpen}>
          <AnimatedMail isOpened={envelopeOpen}>
            <BackFold />
            <Letter isOpened={envelopeOpen}>
              <LetterContent isOpened={envelopeOpen}>
                <InvitationBorder>
                  <p className="text-sm uppercase tracking-wider text-gray-700 mb-8">
                    IT IS WITH JOY THAT WE
                  </p>

                  <p className="text-4xl uppercase tracking-widest text-black font-normal mb-2">
                    ROBERTA
                  </p>

                  <WildMagnoliaText className="text-4xl italic text-black mb-2 font-light">
                    and
                  </WildMagnoliaText>

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
                    {companion || "Guest"}
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
                </InvitationBorder>
              </LetterContent>
            </Letter>
            <TopFold isOpened={envelopeOpen} />
            <Body />
            <LeftFold />
          </AnimatedMail>

          {/* Wax seal */}
          <WaxSeal isOpened={envelopeOpen} hidden={animationComplete}>
            <SealImage
              src="/images/sage-green-wax-seal.png"
              alt="Wax Seal"
              width={80}
              height={80}
            />
          </WaxSeal>
        </LetterImage>
      </EnvelopeContainer>
    </div>
  );
}
