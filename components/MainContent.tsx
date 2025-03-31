"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, Mail } from "lucide-react";
import Image from "next/image";

export default function MainContent() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  useEffect(() => {
    const weddingDate = new Date("2025-06-21T00:00:00");
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3"
          alt="Wedding backdrop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="mb-4 text-6xl font-bold">Roberta & Michael</h1>
            <p className="mb-8 text-xl">June 21st, 2025</p>
            <Button
              onClick={() => setShowRSVPModal(true)}
              className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-sage-800 hover:bg-sage-100"
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-sage-800">Our Story</h2>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <Image
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3"
                alt="Couple"
                width={500}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 space-y-4 text-lg text-sage-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-sage-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-sage-800">Counting Down To Forever</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white p-6 text-center shadow-lg"
              >
                <div className="text-4xl font-bold text-sage-800">{item.value}</div>
                <div className="text-sage-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-sage-800">On the Day</h2>
          <div className="space-y-8">
            {[
              { time: "3:00 PM", event: "Ceremony", icon: Heart },
              { time: "4:00 PM", event: "Cocktail Hour", icon: Clock },
              { time: "5:00 PM", event: "Reception", icon: Calendar },
              { time: "10:00 PM", event: "Farewell", icon: Mail },
            ].map((item) => (
              <div
                key={item.event}
                className="flex items-center gap-6 rounded-lg bg-sage-50 p-6 shadow-sm"
              >
                <div className="rounded-full bg-sage-200 p-4">
                  <item.icon className="h-6 w-6 text-sage-700" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-sage-800">{item.time}</div>
                  <div className="text-sage-600">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <Dialog open={showRSVPModal} onOpenChange={setShowRSVPModal}>
        {/* Add RSVP form content here */}
      </Dialog>
    </div>
  );
}