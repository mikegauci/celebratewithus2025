"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChurchIcon,
  Clock,
  Heart,
  Mail,
  MapPin,
  Sparkles,
  Martini,
  Castle,
  Cake,
  PartyPopper,
  MoonStar,
  Car,
} from "lucide-react";
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
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#f8faf8] py-6">
        <div className="container mx-auto max-w-[1440px] flex min-h-[80vh] flex-col items-center px-4 md:min-h-[90vh] md:flex-row">
          {/* Left Side - Text */}
          <div className="mb-12 flex w-full flex-col justify-center md:mb-0 md:w-[25%] md:pr-8">
            <h1 className="flex flex-col space-y-10 font-primary text-5xl font-thin tracking-wide text-[#4C5D46] md:text-7xl lg:text-6xl">
              ROBERTA
              <div className="font-script text-4xl font-light tracking-widest text-gray-500 md:text-5xl lg:text-6xl">
                and
              </div>
              MICHAEL
            </h1>
            <div className="mt-20 space-y-2 mb-2">
              <h2 className="font-primary text-2xl font-light tracking-[0.25em] text-gray-500 md:text-3xl">
                June 21st, 2025
              </h2>
              <p className="font-primary text-xl font-light tracking-[0.2em] text-gray-500 md:text-2xl">
                Celebrate with us!
              </p>
            </div>
            {/* RSVP Button */}
            <Button
              onClick={() => setShowRSVPModal(true)}
              className="px-10 py-3 bg-sage-600 text-white rounded-none border-none text-lg font-light tracking-widest transition-all hover:bg-sage-700 shadow-md hover:shadow-lg"
            >
              RSVP
            </Button>
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
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="mb-3 text-center font-script text-[140px] font-light tracking-wide text-sage-800 leading-[1] mb-8">
            Our Story
          </h2>
          <div className="mx-auto mb-16 max-w-4xl text-center font-primary text-sage-500">
            <p>
              We met in 2017 at work. Started as colleagues, became friends, and
              thanks to a few group outings (and probably too many after-work
              drinks), things evolved. We found out we had similar interests,
              started dating, and gradually we started to build a life together.
            </p>
            <br />
            <p>
              At some point, we decided sharing a fridge made sense, so we moved
              in together. A while later, Lola, our self-appointed queen of the
              house (also a cat), joined the team and added a new layer of
              entertainment and love to our daily life.
            </p>
            <br />
            <p>
              We spend most summers out on the sea, chasing sunshine, and
              occasionally pretending we're professional boat people. We're also
              into spontaneous road trips, off-roading for no reason, and
              exploring new countries, Switzerland being a favorite, and the
              scene also where we got engaged.
            </p>
            <br />
            <p>
              Now we're getting married, still collecting memories, and still
              figuring things out as we go, with Lola supervising, of course.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Left bride name */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-center">
              <h3 className="mb-3 font-script text-6xl font-light text-sage-800">
                Roberta
              </h3>
              <p className="font-primary text-sm tracking-widest text-sage-600">
                Bride
              </p>
            </div>

            {/* Right groom name */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
              <h3 className="mb-3 font-script text-6xl font-light text-sage-800">
                Michael
              </h3>
              <p className="font-primary text-sm tracking-widest text-sage-600">
                Groom
              </p>
            </div>

            {/* Center images */}
            <div className="flex justify-center space-x-8">
              {/* Bride Image */}
              <div className="relative h-[550px] w-[336px] overflow-hidden rounded-[200px]">
                <Image
                  src="/images/img11.jpeg"
                  alt="Bride"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Groom Image */}
              <div className="relative h-[550px] w-[336px] overflow-hidden rounded-[200px]">
                <Image
                  src="/images/img44.jpeg"
                  alt="Groom"
                  fill
                  className="object-cover object-center"
                />
              </div>
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
        <div className="container mx-auto max-w-[70%] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] font-light tracking-wide text-sage-800">
            Counting Down to Forever
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">
            Our special day is approaching
          </p>
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
                <div className="text-4xl font-bold text-sage-800">
                  {item.value}
                </div>
                <div className="text-sage-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[70%] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] font-light tracking-wide text-sage-800">
            On the Day
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">
            Schedule of events for our celebration
          </p>

          {/* Horizontal Timeline (vertical on mobile) */}
          <div className="mx-auto max-w-5xl">
            {/* Mobile Timeline (vertical) */}
            <div className="md:hidden relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-sage-200"></div>

              <div className="space-y-12">
                {[
                  { time: "16:00", event: "Ceremony", icon: ChurchIcon },
                  { time: "17:00", event: "Prosecco", icon: Martini },
                  { time: "18:00", event: "Arrival at Venue", icon: Castle },
                  { time: "21:15", event: "Cake Cutting", icon: Cake },
                  { time: "21:30", event: "First Dance", icon: PartyPopper },
                  { time: "23:00", event: "After Party", icon: MoonStar },
                  { time: "01:00", event: "Fairwell", icon: Car },
                ].map((item, index) => (
                  <div
                    key={item.event}
                    className="flex items-center justify-center"
                  >
                    <div className="w-[45%] text-right pr-8">
                      <div className="text-lg font-light text-sage-800">
                        {item.time}
                      </div>
                    </div>

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-sage-300">
                      <item.icon className="h-5 w-5 text-sage-700" />
                    </div>

                    <div className="w-[45%] text-left pl-8">
                      <div className="text-lg font-normal tracking-wider text-sage-800">
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Timeline (horizontal) */}
            <div className="hidden md:block relative py-8">
              {/* Horizontal Timeline Line */}
              <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-sage-200"></div>

              <div className="flex justify-between">
                {[
                  { time: "16:00", event: "Ceremony", icon: ChurchIcon },
                  { time: "17:00", event: "Prosecco", icon: Martini },
                  { time: "18:00", event: "Arrival", icon: Castle },
                  { time: "21:15", event: "Cake", icon: Cake },
                  { time: "21:30", event: "Dance", icon: PartyPopper },
                  { time: "23:00", event: "Party", icon: MoonStar },
                  { time: "01:00", event: "Fairwell", icon: Car },
                ].map((item, index) => (
                  <div key={item.event} className="flex flex-col items-center">
                    <div className="text-center mb-8">
                      <div className="text-lg font-light text-sage-800">
                        {item.time}
                      </div>
                    </div>

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-sage-300 mb-8">
                      <item.icon className="h-5 w-5 text-sage-700" />
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-normal tracking-wider text-sage-800">
                        {item.event}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="bg-sage-50 py-20">
        <div className="container mx-auto max-w-[70%] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] font-light tracking-wide text-sage-800">
            Venue
          </h2>

          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-lg text-sage-600">
                <b>Villa Arrigo</b> <br /> St Paul's Street, San Pawl Tat-Targa,
                Naxxar
              </p>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left Column - Venue Image */}
              <div
                className="h-[360px] overflow-hidden shadow-md"
                style={{ borderRadius: "0 50px" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/images/villa-arrigo-123.jpg"
                    alt="Venue"
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Column - Google Maps */}
              <div
                className="h-[360px] overflow-hidden shadow-md"
                style={{ borderRadius: "0 50px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d390.22271232236847!2d14.441439173849428!3d35.9211700283263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4fc6eaa0628f%3A0xac19fe7b799a5e89!2sVilla%20Arrigo%20Hall!5e1!3m2!1sen!2smt!4v1743874879762!5m2!1sen!2smt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="mt-8 flex justify-center">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Villa+Arrigo+Hall+Naxxar+Malta&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="px-10 py-3 bg-sage-600 text-white rounded-none border-none text-lg font-light tracking-widest transition-all hover:bg-sage-700 shadow-md hover:shadow-lg">
                  GET DIRECTIONS
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] font-light tracking-wide text-sage-800">
            Dress Code
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">
            Although we encourage you to wear what makes you feel fabulous, we
            kindly ask you to avoid wearing white, sage & emerald green.
          </p>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-8">
            {[
              { color: "#FFF", name: "White" },
              { color: "#819171", name: "Sage" },
              { color: "#00674F", name: "Emerald" },
            ].map((item) => (
              <div key={item.name} className="text-center">
                <div className="group relative mb-3 h-24 w-24 overflow-hidden rounded-full shadow-md transition-all duration-300 hover:shadow-lg">
                  <div
                    className="absolute inset-0 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-sage-700">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <Dialog open={showRSVPModal} onOpenChange={setShowRSVPModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-sage-800">
              RSVP
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-sage-700"
              >
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
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-sage-700"
              >
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
              <label
                htmlFor="guests"
                className="mb-1 block text-sm font-medium text-sage-700"
              >
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
              <label
                htmlFor="dietary"
                className="mb-1 block text-sm font-medium text-sage-700"
              >
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
            <h2 className="font-script text-6xl font-light tracking-wide text-white">
              Roberta & Michael
            </h2>
            <p className="mt-2 font-primary text-sage-300">June 21st, 2025</p>
          </div>

          <div className="mb-8 flex justify-center space-x-6">
            <a
              href="#"
              className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600"
            >
              <Heart className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-sage-700 p-3 text-white transition-all duration-300 hover:bg-sage-600"
            >
              <Calendar className="h-5 w-5" />
            </a>
          </div>

          <p className="text-center text-sm font-primary text-sage-400">
            We can't wait to celebrate with you!
          </p>

          <p className="mt-8 text-center text-xs font-primary text-sage-500">
            Website developed by the Groom with love 🤍
          </p>
        </div>
      </footer>
    </div>
  );
}
