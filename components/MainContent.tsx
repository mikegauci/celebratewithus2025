"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, Mail, MapPin, Sparkles } from "lucide-react";
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
      <section className="relative min-h-screen bg-[#f8faf8] py-12 md:py-20">
        <div className="container mx-auto max-w-[1440px] flex min-h-[80vh] flex-col items-center px-4 md:min-h-[90vh] md:flex-row">
          {/* Left Side - Text */}
          <div className="mb-12 flex w-full flex-col justify-center md:mb-0 md:w-[25%] md:pr-8">
            <h1 className="flex flex-col space-y-10 font-primary text-5xl font-thin tracking-wide text-[#4C5D46] md:text-7xl lg:text-6xl">
              <div className="tracking-wider tracking-[0.15em]">ROBERTA</div>
              <div className="font-script text-4xl font-light tracking-widest text-gray-500 md:text-5xl lg:text-6xl">and</div>
              <div className="tracking-wider tracking-[0.15em]">MICHAEL</div>
            </h1>
            <div className="mt-20 space-y-2">
              <h2 className="font-primary text-2xl font-light tracking-[0.25em] text-gray-500 md:text-3xl">
                June 21st, 2025
              </h2>
              <p className="font-primary text-xl font-light tracking-[0.2em] text-gray-500 md:text-2xl">
                Celebrate with us!
              </p>
            </div>
          </div>
          
          {/* Right Side - Images */}
          <div className="w-full md:w-[75%]">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {/* First Image */}
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-t-full bg-gray-200">
                  <div className="relative h-[350px] w-full md:h-[450px] lg:h-[550px]">
                    <Image
                      src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3"
                      alt="Wedding couple dancing"
                      fill
                      sizes="(max-width: 768px) 20vw, 20vw"
                      className="object-cover object-center grayscale"
                    />
                  </div>
                </div>
              </div>
              
              {/* Second Image */}
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-t-full bg-gray-200">
                  <div className="relative h-[350px] w-full md:h-[450px] lg:h-[550px]">
                    <Image
                      src="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3"
                      alt="Wedding couple"
                      fill
                      sizes="(max-width: 768px) 20vw, 20vw"
                      className="object-cover object-center grayscale"
                    />
                  </div>
                </div>
              </div>
              
              {/* Third Image */}
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-t-full bg-gray-200">
                  <div className="relative h-[350px] w-full md:h-[450px] lg:h-[550px]">
                    <Image
                      src="https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3"
                      alt="Wedding couple"
                      fill
                      sizes="(max-width: 768px) 20vw, 20vw"
                      className="object-cover object-center grayscale"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* RSVP Button */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center md:bottom-10">
          <Button
            onClick={() => setShowRSVPModal(true)}
            className="font-primary rounded-none border border-gray-400 bg-transparent px-8 py-3 text-base font-light tracking-widest text-gray-700 transition-all duration-300 hover:border-gray-700 hover:text-gray-900 md:px-10 md:py-4 md:text-lg"
          >
            RSVP
          </Button>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="mb-4 flex justify-center">
            <div className="h-0.5 w-16 bg-sage-200"></div>
          </div>
          <h2 className="mb-3 text-center font-script text-4xl font-light tracking-wide text-sage-800">Our Story</h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">The journey of how we found each other and fell in love</p>
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
      <section className="relative bg-sage-100 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full border border-sage-300"></div>
          <div className="absolute right-1/4 bottom-1/4 h-60 w-60 rounded-full border border-sage-300"></div>
          <div className="absolute left-2/3 top-1/2 h-20 w-20 rounded-full border border-sage-300"></div>
        </div>
        <div className="container relative mx-auto max-w-[1440px] px-4">
          <div className="mb-4 flex justify-center">
            <div className="h-0.5 w-16 bg-sage-300"></div>
          </div>
          <h2 className="mb-3 text-center font-script text-4xl font-light tracking-wide text-sage-800">Counting Down To Forever</h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">Our special day is approaching</p>
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
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="mb-4 flex justify-center">
            <div className="h-0.5 w-16 bg-sage-200"></div>
          </div>
          <h2 className="mb-3 text-center font-script text-4xl font-light tracking-wide text-sage-800">On the Day</h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">Schedule of events for our celebration</p>
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

      {/* Venue Section */}
      <section className="bg-sage-50 py-20">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="mb-4 flex justify-center">
            <div className="h-0.5 w-16 bg-sage-300"></div>
          </div>
          <h2 className="mb-3 text-center font-script text-4xl font-light tracking-wide text-sage-800">Venue</h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">Join us at this beautiful location</p>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3"
                alt="Venue"
                fill
                className="object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </div>
            <div className="p-8">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full bg-sage-100 p-4">
                  <MapPin className="h-6 w-6 text-sage-700" />
                </div>
              </div>
              <h3 className="mb-2 text-center text-2xl font-semibold text-sage-800">The Grand Palace</h3>
              <p className="mb-6 text-center text-lg text-sage-600">
                123 Wedding Avenue, Malta
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-sage-100">
                {/* Placeholder for a map or venue image */}
                <div className="flex h-full items-center justify-center text-sage-500">
                  <p className="text-center">Map will be displayed here</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button className="rounded-full bg-sage-600 px-6 py-2 text-white shadow-md transition-all duration-300 hover:bg-sage-700 hover:shadow-lg">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="mb-4 flex justify-center">
            <div className="h-0.5 w-16 bg-sage-200"></div>
          </div>
          <h2 className="mb-3 text-center font-script text-4xl font-light tracking-wide text-sage-800">Dress Code</h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">Semi-formal attire in our wedding palette</p>
          
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-8">
            {[
              { color: "#E8D2C3", name: "Champagne" },
              { color: "#D3C0AD", name: "Taupe" },
              { color: "#A69F88", name: "Sage" },
              { color: "#9A8A78", name: "Warm Brown" },
              { color: "#F5F1ED", name: "Ivory" },
            ].map((item) => (
              <div key={item.name} className="text-center">
                <div 
                  className="group relative mb-3 h-24 w-24 cursor-pointer overflow-hidden rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div 
                    className="absolute inset-0 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-full items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white/70" />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-sage-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <Dialog open={showRSVPModal} onOpenChange={setShowRSVPModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-sage-800">RSVP</DialogTitle>
          </DialogHeader>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-sage-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-sage-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-sage-700">
                Will you be attending?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    className="mr-2 text-sage-600 focus:ring-sage-500"
                  />
                  <span>Yes, I'll be there!</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    className="mr-2 text-sage-600 focus:ring-sage-500"
                  />
                  <span>Sorry, I can't make it</span>
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="guests" className="mb-1 block text-sm font-medium text-sage-700">
                Number of Guests (including yourself)
              </label>
              <select
                id="guests"
                className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dietary" className="mb-1 block text-sm font-medium text-sage-700">
                Dietary Restrictions
              </label>
              <textarea
                id="dietary"
                className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                placeholder="Please let us know of any dietary restrictions"
                rows={3}
              ></textarea>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                className="rounded-full bg-sage-600 px-8 py-2 font-semibold text-white hover:bg-sage-700"
              >
                Submit RSVP
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer Section */}
      <footer className="bg-sage-800 py-12 text-sage-100">
        <div className="container mx-auto max-w-[1440px] px-4">
          <div className="mb-8 flex justify-center">
            <div className="h-px w-16 bg-sage-600"></div>
          </div>
          
          <div className="mb-8 text-center">
            <h2 className="font-script text-2xl font-light tracking-wide text-white">Roberta & Michael</h2>
            <p className="mt-2 font-primary text-sage-300">June 21st, 2025</p>
          </div>
          
          <div className="mb-8 flex justify-center space-x-6">
            <a href="#" className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600">
              <Heart className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600">
              <Mail className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600">
              <Calendar className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-center text-sm font-primary text-sage-400">
            We can't wait to celebrate with you!
          </p>
          
          <p className="mt-8 text-center text-xs font-primary text-sage-500">
            © 2025 Roberta & Michael | Website designed with love
          </p>
        </div>
      </footer>
    </div>
  );
}