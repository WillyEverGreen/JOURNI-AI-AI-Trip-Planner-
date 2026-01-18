import React, { useRef } from "react";
import { Timeline } from "../ui/timeline";
import { Check, MapPin, Calendar, Wallet, Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HowItWorks() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".how-it-works-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  const data = [
    {
      title: "Step 1",
      content: (
        <div>
          <p className="text-neutral-800 text-base md:text-lg font-medium mb-8 leading-relaxed">
            Tell us about your dream trip. Share your preferences, and we'll craft the perfect itinerary tailored just for you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-3 items-center text-neutral-700 text-base font-medium">
                 <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                    <MapPin className="w-5 h-5 text-[#e63946]" />
                 </div>
                 <span>Choose Destination</span>
              </div>
              <div className="flex gap-3 items-center text-neutral-700 text-base font-medium">
                 <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                    <Calendar className="w-5 h-5 text-[#e63946]" />
                 </div>
                 <span>Travel Dates (No. of Days)</span>
              </div>
               <div className="flex gap-3 items-center text-neutral-700 text-base font-medium">
                 <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                    <Wallet className="w-5 h-5 text-[#e63946]" />
                 </div>
                 <span>Your Budget</span>
              </div>
               <div className="flex gap-3 items-center text-neutral-700 text-base font-medium">
                 <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                    <Users className="w-5 h-5 text-[#e63946]" />
                 </div>
                 <span>Who you're traveling with</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
               <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                alt="Travel Planning"
                className="rounded-xl object-cover h-64 md:h-80 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <p className="text-neutral-800 text-base md:text-lg font-medium mb-8 leading-relaxed">
            Our AI analyzes your preferences to generate a personalized itinerary. We find the best hotels, 
            flights (optional), and activities that match your style. No more hours spent browsing endless review sites.
          </p>
           <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop"
              alt="AI Processing"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Data Analysis"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <p className="text-neutral-800 text-base md:text-lg font-medium mb-8 leading-relaxed">
            Review your complete day-by-day plan. See interactive maps, check hotel details, and easily share
            the itinerary with your travel companions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 gap-4">
               <div className="flex gap-3 items-center text-neutral-700 text-sm md:text-base">
                <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                  <Check className="w-5 h-5 text-[#e63946]" />
                </div>
                <span className="font-medium">Day-by-day itinerary</span>
              </div>
              <div className="flex gap-3 items-center text-neutral-700 text-sm md:text-base">
                <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                  <Check className="w-5 h-5 text-[#e63946]" />
                </div>
                <span className="font-medium">Hotel & Dining recommendations</span>
              </div>
              <div className="flex gap-3 items-center text-neutral-700 text-sm md:text-base">
                <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                  <Check className="w-5 h-5 text-[#e63946]" />
                </div>
                <span className="font-medium">Interactive Maps</span>
              </div>
              <div className="flex gap-3 items-center text-neutral-700 text-sm md:text-base">
                <div className="bg-[#e63946]/10 p-2 rounded-full shrink-0">
                  <Check className="w-5 h-5 text-[#e63946]" />
                </div>
                <span className="font-medium">Budget Estimation</span>
              </div>
            </div>
             <div className="grid grid-cols-1">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
                alt="Itinerary Review"
                className="rounded-xl object-cover h-64 md:h-80 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="how-it-works" className="w-full relative" ref={containerRef}>
      {/* Title Section was missing class for animation? No, it's inside Timeline. 
          Actually Timeline styling is inside timeline.jsx. 
          I need to target '.how-it-works-title' which isn't there yet.
          Wait, I should wrap Timeline in a div that I can animate? 
          The Timeline component has the header inside it.
          I'll modify Timeline.jsx to accept className or ref?
          Or I can just animate the whole Timeline component wrapper.
          
          Actually, let's look at Timeline.jsx. It has the header built-in.
          I will animate the whole thing here for simplicity or wrap it. 
          
          Let's try to pass a className or just animate the container contents.
          I set the class 'how-it-works-content' on the Timeline container.
      */}
      <div className="how-it-works-content opacity-0">
         <Timeline data={data} />
      </div>
    </div>
  );
}
