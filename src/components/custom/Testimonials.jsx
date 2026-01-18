import { TestimonialsColumn } from "../ui/testimonials-columns";
// import { motion } from "motion/react"; // Unused
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const testimonials = [
  {
    text: "This AI planner generated a complete 5-day Tokyo itinerary for me in seconds. It even included train routes!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    name: "Briana Patton",
    role: "Solo Traveler",
  },
  {
    text: "I told the AI I wanted 'hidden gems' in Rome, and it found incredible non-touristy trattorias.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    name: "Bilal Ahmed",
    role: "Food Blogger",
  },
  {
    text: "The budget estimation was spot on. I requested a mid-range trip to Bali and it nailed the hotel choices.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    name: "Saman Malik",
    role: "Digital Nomad",
  },
  {
    text: "I love that I can choose who I'm traveling with. The family recommendations were perfect for my kids.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    name: "Omar Raza",
    role: "Tech Enthusiast",
  },
  {
    text: "The interactive map is brilliant. I could see exactly where my hotel was relative to the sights.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    name: "Zainab Hussain",
    role: "Parent",
  },
  {
    text: "Finally, a tool that considers my 'luxury' preference without breaking the bank. Superb AI suggestions.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop",
    name: "Aliza Khan",
    role: "Globetrotter",
  },
  {
    text: "No more spreadsheets! This app tracks my hotels, flights, and daily activities in one beautiful UI.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    name: "Farhan Siddiqui",
    role: "Budget Traveler",
  },
  {
    text: "It's like having a local guide in your pocket. The 'Cheap' budget option actually gave great hostel picks.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    name: "Sana Sheikh",
    role: "Backpacker",
  },
  {
    text: "I planned a couple's getaway and the AI suggested the most romantic sunset spots. Highly recommend!",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
    name: "Hassan Ali",
    role: "Frequent Flyer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      ".testimonials-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".testimonials-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="container z-10 mx-auto px-6">
        <div
          className="testimonials-header opacity-0 flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
        >
          <div className="flex justify-center">
            <div className="border border-[#e63946]/20 bg-[#fff5f6] py-1 px-4 rounded-full text-[#e63946] text-sm font-medium">Testimonials</div>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-5 text-[#2b2d42] text-center">
            What our users say
          </h2>
          <p className="text-center mt-5 text-[#555] text-lg">
            See what our customers have to say about us.
          </p>
        </div>

        <div className="testimonials-content opacity-0 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
