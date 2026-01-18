import React, { useRef } from "react";
import { Compass, Map, CalendarClock, Camera } from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
// import { cn } from "../../lib/utils"; // Unused
import gsap from "gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Smart Itineraries",
    description: "AI-curated day-by-day plans that fit your vibe and time.",
    icon: <CalendarClock className="h-4 w-4 text-neutral-500" />,
     className: "md:col-span-1",
     img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
  },
  {
    title: "Discover Hidden Gems",
    description: "Find places locals love, not just tourist traps.",
    icon: <Compass className="h-4 w-4 text-neutral-500" />,
     className: "md:col-span-2",
     img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Interactive Maps",
    description: "See everything on a clean, shareable map.",
    icon: <Map className="h-4 w-4 text-neutral-500" />,
     className: "md:col-span-2",
     img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop",
  },
  {
    title: "Picture-Perfect Picks",
    description: "Rich visuals of hotels, spots, and activities.",
    icon: <Camera className="h-4 w-4 text-neutral-500" />,
     className: "md:col-span-1",
     img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(
      ".bento-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );
     // Animate Title separately
     gsap.fromTo(
      ".features-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
         scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", 
          toggleActions: "play none none none",
        },
      }
     )
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative px-6 py-48 md:py-60 bg-transparent">
      <div className="mx-auto max-w-6xl">
        <h2
          className="features-title text-center text-3xl md:text-4xl font-extrabold text-[#2b2d42] mb-12"
        >
          Everything you need to plan better
        </h2>
       
       <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {features.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>
            }
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
      </div>
    </section>
  );
}
