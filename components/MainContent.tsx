"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChurchIcon,
  Martini,
  Castle,
  Cake,
  PartyPopper,
  MoonStar,
  Car,
} from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function MainContent() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "1",
    dietary: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Add state for header scrolled status
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Add state for showing/hiding back-to-top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  const carouselImages = [
    {
      src: "/images/img-1111.jpg",
      alt: "Img 1",
    },
    {
      src: "/images/img-2222.jpg",
      alt: "Img 2",
    },
    {
      src: "/images/img-22.jpg",
      alt: "Img 3",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carouselImages.length - 1 ? 0 : prevSlide + 1
    );
  }, [carouselImages.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      const nextSlideIndex =
        currentSlide === carouselImages.length - 1 ? 0 : currentSlide + 1;
      goToSlide(nextSlideIndex);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      const nextSlideIndex =
        currentSlide === 0 ? carouselImages.length - 1 : currentSlide - 1;
      goToSlide(nextSlideIndex);
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.attendance) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Please fill out all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email notification using EmailJS
      console.log("Sending email via EmailJS...");
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_1f2bjfo",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_6rdojjl",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "5c_MeTTACsPf5dLP5"
      );
      console.log("EmailJS submission successful");

      // Send data to Google Sheets
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      console.log("Google Script URL:", googleScriptUrl);
      
      if (!googleScriptUrl) {
        console.error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL environment variable is missing");
        throw new Error("Google Script URL not configured. Please set the NEXT_PUBLIC_GOOGLE_SCRIPT_URL environment variable.");
      }
      
      // Prepare the form data for Google Sheets
      const formDataForSheets = {
        name: formData.name,
        email: formData.email,
        attendance: formData.attendance,
        guests: formData.guests,
        dietary: formData.dietary,
        timestamp: new Date().toISOString()
      };
      
      console.log("Sending data to Google Sheets:", formDataForSheets);
      
      try {
        // Make fetch request to Google Apps Script web app
        // Using no-cors mode as Google Apps Script might not allow CORS from all origins
        const response = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataForSheets),
          mode: "no-cors" // Use no-cors to ensure the request is sent even if CORS is restricted
        });
        
        console.log("Google Sheets request sent, but response in no-cors mode cannot be read");
        // Note: In no-cors mode, we can't read the response details
      } catch (sheetError) {
        console.error("Google Sheets submission error:", sheetError);
        // Continue with form success even if Google Sheets fails
        // We don't want to block the user experience if only the logging fails
      }

      setSubmitStatus({
        submitted: true,
        success: true,
        message:
          "Thank you for your RSVP! We look forward to celebrating with you.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        attendance: "",
        guests: "1",
        dietary: "",
      });

      // Close modal after 3 seconds on success
      setTimeout(() => {
        setShowRSVPModal(false);
        setSubmitStatus({
          submitted: false,
          success: false,
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitStatus({
        submitted: true,
        success: false,
        message:
          "There was an error submitting your RSVP. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle smooth scrolling and close mobile menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 45; // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };
  
  // Update scroll handlers to also handle back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'our-story', 'countdown', 'timeline', 'venues', 'dress-code'];
      const currentPosition = window.scrollY + 100; // Add offset for header
      
      // Show back-to-top button when scrolled down 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Check if at the top of the page (hero section)
      const ourStoryElement = document.getElementById('our-story');
      if (ourStoryElement && window.scrollY < ourStoryElement.offsetTop - 100) {
        setActiveSection('hero');
        return;
      }
      
      for (const section of sections) {
        if (section === 'hero') continue; // Skip hero in the loop check
        
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (currentPosition >= top && currentPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function for desktop nav link class
  const getNavLinkClass = (sectionId: string) => {
    return `transition-all hover:border-b hover:border-[#5c745c] hover:pb-1 ${
      activeSection === sectionId 
        ? 'border-b border-[#5c745c] pb-1' 
        : ''
    }`;
  };
  
  // Function for mobile nav link class
  const getMobileNavLinkClass = (sectionId: string) => {
    return `block py-1 transition-all hover:pl-2 hover:border-l-2 hover:border-[#5c745c] ${
      activeSection === sectionId 
        ? 'pl-2 border-l-2 border-[#5c745c]' 
        : ''
    }`;
  };

  // Update header style on scroll
  useEffect(() => {
    const handleHeaderScroll = () => {
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    return () => window.removeEventListener('scroll', handleHeaderScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Check if screen is mobile width for background image
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Set up listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerScrolled ? 'bg-[#f8faf8] shadow-md' : 'bg-[#f8faf8] backdrop-blur-sm'}`}>
        <div className="container mx-auto max-w-[1440px] py-3 px-4">
          <nav className="flex items-center justify-start md:justify-center">
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-sage-700 hover:text-sage-900"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
              </button>
            </div>
            
            
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 text-sm font-primary text-sage-700">
              <li><a href="#our-story" className={getNavLinkClass('our-story')} onClick={(e) => handleNavClick(e, 'our-story')}>Our Story</a></li>
              <li><a href="#countdown" className={getNavLinkClass('countdown')} onClick={(e) => handleNavClick(e, 'countdown')}>Countdown</a></li>
              <li><a href="#timeline" className={getNavLinkClass('timeline')} onClick={(e) => handleNavClick(e, 'timeline')}>Timeline</a></li>
              <li><a href="#venues" className={getNavLinkClass('venues')} onClick={(e) => handleNavClick(e, 'venues')}>Venues</a></li>
              <li><a href="#dress-code" className={getNavLinkClass('dress-code')} onClick={(e) => handleNavClick(e, 'dress-code')}>Dress Code</a></li>
            </ul>
          </nav>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-sage-100">
              <ul className="flex flex-col space-y-3 text-sm font-primary text-sage-700">
                <li><a href="#our-story" className={getMobileNavLinkClass('our-story')} onClick={(e) => handleNavClick(e, 'our-story')}>Our Story</a></li>
                <li><a href="#countdown" className={getMobileNavLinkClass('countdown')} onClick={(e) => handleNavClick(e, 'countdown')}>Countdown</a></li>
                <li><a href="#timeline" className={getMobileNavLinkClass('timeline')} onClick={(e) => handleNavClick(e, 'timeline')}>Timeline</a></li>
                <li><a href="#venues" className={getMobileNavLinkClass('venues')} onClick={(e) => handleNavClick(e, 'venues')}>Venues</a></li>
                <li><a href="#dress-code" className={getMobileNavLinkClass('dress-code')} onClick={(e) => handleNavClick(e, 'dress-code')}>Dress Code</a></li>
              </ul>
            </div>
          )}
        </div>
      </header>
      
      {/* Add padding to account for fixed header */}
      <div className="pt-12"></div>
      
      {/* Hero Section */}
      <section
        className="relative bg-[#f8faf8] py-10 md:min-h-screen"
        id="hero"
      >
        <div className="container mx-auto max-w-[1440px] flex flex-col items-center px-4 md:min-h-[90vh] md:flex-col lg:flex-row">
          {/* Left Side - Text */}
          <div className="flex w-full text-center flex-col justify-center md:mb-8 lg:mb-0 md:w-full lg:w-[25%] md:pr-0 lg:pr-8 mt-8 lg:relative z-10 absolute lg:static inset-0 flex items-center justify-center md:static lg:items-start md:justify-center lg:justify-start">
            <h1 className="flex flex-col space-y-10 font-primary w-full text-5xl font-thin tracking-wide text-white md:text-[#4C5D46] md:text-7xl lg:text-6xl">
              ROBERTA
              <div className="font-script text-4xl font-light tracking-widest text-white md:text-gray-500 md:text-5xl lg:text-6xl">
                and
              </div>
              MICHAEL
            </h1>
            <div className="mt-20 space-y-2 mb-2 w-full">
              <h2 className="font-primary text-2xl font-light text-white md:text-gray-500 md:text-3xl">
                June 21st, 2025
              </h2>
              <p
                className="font-primary text-xl font-light text-white md:text-gray-500 md:text-2xl"
                style={{ letterSpacing: "1px" }}
              >
                Celebrate with us!
              </p>
            </div>
            {/* RSVP Button */}
            <Button
              onClick={() => setShowRSVPModal(true)}
              className="px-10 py-3 bg-sage-600 text-white rounded-full border-none text-lg font-light tracking-widest transition-all hover:bg-sage-700 shadow-md hover:shadow-lg"
              style={{ width: "210px", margin: "20px auto 0" }}
            >
              RSVP
            </Button>
          </div>

          {/* Right Side - Images */}
          <div className="w-full md:w-full lg:w-[75%]">
            {/* Desktop Images */}
            <div className="hidden md:grid grid-cols-3 gap-3 md:gap-6">
              {carouselImages.map((image, index) => (
                <div key={index} className="flex flex-col">
                  <div className="overflow-hidden rounded-t-full">
                    <div className="relative h-[350px] w-full md:h-[450px] lg:h-[550px]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 20vw, 20vw"
                        className="object-cover object-center grayscale transition-all duration-500 hover:grayscale-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              {/* Carousel container */}
              <div
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-t-full transition-opacity duration-1000 ease-in-out group ${
                      currentSlide === index
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 absolute inset-0"
                    }`}
                  >
                    <div className="relative h-[550px] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover object-center transition-all duration-500"
                      />
                      {/* Dark overlay with matching border radius */}
                      <div className="absolute inset-0 bg-black/50 rounded-t-full transition-opacity duration-500 group-hover:opacity-30"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-12" id="our-story">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] md:text-[140px] font-light tracking-wide text-sage-800 leading-[1] mb-8">
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

          {/* Bride and Groom Section */}
          <div className="relative mx-auto max-w-6xl">
            {/* Desktop Layout */}
            <div className="hidden md:block">
              {/* Left bride name */}
              <div className="absolute z-10 left-8 top-1/2 -translate-y-1/2 text-center">
                <h3 className="mb-3 font-script text-6xl font-light text-sage-800">
                  Roberta
                </h3>
                <p className="font-primary text-sm tracking-widest text-sage-600">
                  Bride
                </p>
              </div>

              {/* Right groom name */}
              <div className="absolute z-10 right-8 top-1/2 -translate-y-1/2 text-center">
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
                    src="/images/roberta-22.jpg"
                    alt="Bride"
                    fill
                    className="object-cover object-center transition-all duration-500 hover:grayscale"
                  />
                </div>

                {/* Groom Image */}
                <div className="relative h-[550px] w-[336px] overflow-hidden rounded-[200px]">
                  <Image
                    src="/images/michael-222.jpg"
                    alt="Groom"
                    fill
                    className="object-cover object-center transition-all duration-500 hover:grayscale"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="md:hidden flex flex-col items-center space-y-10">
              {/* Roberta (Bride) Section */}
              <div className="text-center">
                <h3 className="mb-2 font-script text-5xl font-light text-sage-800">
                  Roberta
                </h3>
                <p className="mb-6 font-primary text-sm tracking-widest text-sage-600">
                  Bride
                </p>
                <div className="relative h-[500px] w-[300px] overflow-hidden rounded-[200px]">
                  <Image
                    src="/images/roberta-22.jpg"
                    alt="Bride"
                    fill
                    className="object-cover object-center transition-all duration-500 hover:grayscale"
                  />
                </div>
              </div>

              {/* Michael (Groom) Section */}
              <div className="text-center">
                <h3 className="mb-2 font-script text-5xl font-light text-sage-800">
                  Michael
                </h3>
                <p className="mb-6 font-primary text-sm tracking-widest text-sage-600">
                  Groom
                </p>
                <div className="relative h-[500px] w-[300px] overflow-hidden rounded-[200px]">
                  <Image
                    src="/images/michael-222.jpg"
                    alt="Groom"
                    fill
                    className="object-cover object-center transition-all duration-500 hover:grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative bg-sage-100 py-20 overflow-hidden" id="countdown">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full border border-sage-300"></div>
          <div className="absolute right-1/4 bottom-1/4 h-60 w-60 rounded-full border border-sage-300"></div>
          <div className="absolute left-2/3 top-1/2 h-20 w-20 rounded-full border border-sage-300"></div>
        </div>
        <div className="container mx-auto max-w-[90%] md:max-w-[70%] px-4">
          <h2 className="mb-3 text-center font-script text-[40px] md:text-[70px] font-light tracking-wide text-sage-800">
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
      <section 
        className="relative bg-white py-32 md:py-40" 
        id="timeline"
        style={{
          backgroundImage: isMobile 
            ? "url('/images/mike-and-rob-mobile.jpg')" 
            : "url('/images/mike-and-rob-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          minHeight: "900px"
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto max-w-[70%] px-4 relative z-10">
          <div className="pt-0 md:pt-2 pb-16">
            <h2 className="mb-3 leading-none text-center font-script text-[70px] font-light tracking-wide text-white whitespace-nowrap">
              On the Day
            </h2>
            <p className="mx-auto max-w-xl text-center font-primary text-white/90">
              Schedule of events for our celebration
            </p>
          </div>

          {/* Horizontal Timeline (vertical on mobile) */}
          <div className="mx-auto max-w-5xl">
            {/* Mobile Timeline (vertical) */}
            <div className="md:hidden relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50"></div>

              <div className="space-y-12">
                {[
                  { time: "16:00", event: "Ceremony", icon: ChurchIcon },
                  { time: "17:00", event: "Prosecco", icon: Martini },
                  { time: "18:00", event: "Arrival at\nVenue", icon: Castle },
                  { time: "21:15", event: "Cake\nCutting", icon: Cake },
                  { time: "21:30", event: "First\nDance", icon: PartyPopper },
                  { time: "23:00", event: "After\nParty", icon: MoonStar },
                  { time: "01:00", event: "Farewell", icon: Car },
                ].map((item, index) => (
                  <div
                    key={item.event}
                    className="flex items-center justify-center"
                  >
                    <div className="w-[40%] text-right pr-6">
                      <div className="text-lg font-light text-white">
                        {item.time}
                      </div>
                    </div>

                    <div className="relative z-10 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-white/95 border border-white/30 shadow-md">
                      <div className="flex items-center justify-center">
                        <item.icon className="h-7 w-7 text-sage-700" strokeWidth={1} />
                      </div>
                    </div>

                    <div className="w-[40%] text-left pl-6">
                      <div className="text-base font-normal tracking-wider text-white whitespace-pre-line">
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
              <div className="absolute top-1/2 left-0 right-0 h-px w-[90%] mx-auto -translate-y-1/2 bg-white/50"></div>
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
                      <div className="text-lg font-light text-white">
                        {item.time}
                      </div>
                    </div>

                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 border border-white/30 mb-8 shadow-md">
                      <div className="flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-sage-700" strokeWidth={1} />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-normal tracking-wider text-white">
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
      <section className="bg-sage-50 py-20" id="venues">
        <div className="container mx-auto max-w-[70%] px-4">
          <h2 className="mb-3 text-center font-script text-[40px] md:text-[70px] font-light tracking-wide text-sage-800">
            Venues
          </h2>

          <div className="mx-auto max-w-6xl">
            {/* Ceremony Venue */}
            <div className="mb-16">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-3xl font-primary text-sage-800">
                  Ceremony
                </h3>
                <p className="text-lg text-sage-600">
                  <b>St Joseph The Worker Church</b> <br /> Xemxija, St. Paul's
                  Bay, Malta
                </p>
              </div>

              {/* Two column layout for church */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Column - Church Image */}
                <div
                  className="h-[360px] overflow-hidden shadow-md"
                  style={{ borderRadius: "0 50px" }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/xemxija-church-1.jpg"
                      alt="St Joseph The Worker Church"
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d277.7619494467487!2d14.386889657026051!3d35.95261784033847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4fcdb4a90b47%3A0x40eef3965fa288ae!2sSt%20Joseph%20The%20Worker%20Church!5e1!3m2!1sen!2smt!4v1744546189823!5m2!1sen!2smt"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Get Directions Button for Church */}
              <div className="mt-8 flex justify-center">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=St+Joseph+The+Worker+Church+St+Pauls+Bay+Malta&travelmode=driving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="px-10 py-3 bg-sage-600 text-white rounded-full border-none text-lg font-light transition-all hover:bg-sage-700 shadow-md hover:shadow-lg">
                    Get Directions to Church
                  </Button>
                </a>
              </div>
            </div>

            {/* Reception Venue */}
            <div>
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-3xl font-primary text-sage-800">
                  Reception
                </h3>
                <p className="text-lg text-sage-600">
                  <b>Villa Arrigo</b> <br /> St Paul's Street, San Pawl
                  Tat-Targa, Naxxar
                </p>
              </div>

              {/* Two column layout for reception venue */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Column - Venue Image */}
                <div
                  className="h-[360px] overflow-hidden shadow-md"
                  style={{ borderRadius: "0 50px" }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/villa-arrigo-123.jpg"
                      alt="Villa Arrigo"
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

              {/* Get Directions Button for Reception */}
              <div className="mt-8 flex justify-center">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Villa+Arrigo+Hall+Naxxar+Malta&travelmode=driving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="px-10 py-3 bg-sage-600 text-white rounded-full border-none text-lg font-light transition-all hover:bg-sage-700 shadow-md hover:shadow-lg">
                    Get Directions to Venue
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="bg-white py-20" id="dress-code">
        <div className="container mx-auto max-w-[1440px] px-4">
          <h2 className="mb-3 text-center font-script text-[70px] font-light tracking-wide text-sage-800">
            Dress Code
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center font-primary text-sage-500">
            Although we encourage you to wear what makes you feel fabulous, we
            kindly ask you to{" "}
            <strong>
              <i>
                <u>avoid</u>
              </i>{" "}
              wearing white, sage & emerald green.
            </strong>
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
            <DialogTitle className="text-center text-2xl font-primary font-bold text-sage-800">
              RSVP
            </DialogTitle>
          </DialogHeader>

          {submitStatus.submitted && submitStatus.success ? (
            <div className="py-8 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-2 inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-sage-700">{submitStatus.message}</p>
            </div>
          ) : (
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              {submitStatus.submitted && !submitStatus.success && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <p className="text-sm text-red-700">{submitStatus.message}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-sage-700"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-sage-700">
                  Will you be attending?*
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={handleInputChange}
                      className="mr-2 text-sage-600 focus:ring-sage-500"
                      required
                    />
                    <span>Yes, I'll be there!</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={handleInputChange}
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
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
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
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-sage-200 p-2 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                  placeholder="Please let us know of any dietary restrictions"
                  rows={3}
                ></textarea>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  type="submit"
                  className="rounded-full bg-sage-600 px-8 py-2 font-semibold text-white hover:bg-sage-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit RSVP"}
                </Button>
              </div>
            </form>
          )}
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

          <p className="text-center text-sm font-primary text-sage-400">
            We can't wait to celebrate with you!
          </p>

          <p className="mt-8 text-center text-xs font-primary text-sage-500">
            Website developed by the Groom with love 🤍
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-sage-600 text-white shadow-lg transition-all duration-300 hover:bg-sage-700 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
