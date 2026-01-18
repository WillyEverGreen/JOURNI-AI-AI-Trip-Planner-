"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const TimelineItem = ({ item, scrollYProgress, timelineHeight }) => {
    const ref = useRef(null);
    const [y, setY] = useState(0);
    const [configOffset, setConfigOffset] = useState(60);

    useEffect(() => {
        if (ref.current) {
            setY(ref.current.offsetTop);
        }
        
        const updateOffset = () => {
             // Tailwind 'md' is 768px
             // Desktop: pt-40 (160px) + half dot (20px) = 180px
             // Mobile: pt-10 (40px) + half dot (20px) = 60px
             if (window.innerWidth >= 768) {
                 setConfigOffset(180); 
             } else {
                 setConfigOffset(60); 
             }
        };
        
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, [timelineHeight]); 

    const threshold = y + configOffset; 

    // Using provided reduced glow settings but ensuring logic is sound
    const backgroundColor = useTransform(scrollYProgress, (pos) => (pos * timelineHeight > threshold) ? "#e63946" : "#ffffff");
    const borderColor = useTransform(scrollYProgress, (pos) => (pos * timelineHeight > threshold) ? "#e63946" : "#e5e5e5");
    const glow = useTransform(scrollYProgress, (pos) => (pos * timelineHeight > threshold) ? "0 0 15px rgba(230, 57, 70, 0.4)" : "none");
    const innerDotColor = useTransform(scrollYProgress, (pos) => (pos * timelineHeight > threshold) ? "#ffffff" : "#e5e5e5");

    return (
        <div
            ref={ref}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
        >
            <div className="relative md:sticky flex flex-col md:flex-row z-40 items-center top-0 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div 
                    style={{ backgroundColor, borderColor, boxShadow: glow }}
                    className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center border transition-colors duration-300"
                >
                    <motion.div 
                        style={{ backgroundColor: innerDotColor }}
                        className="h-4 w-4 rounded-full p-2 transition-colors duration-300" 
                    />
                </motion.div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#2b2d42] ">
                    {item.title}
                </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#2b2d42]">
                    {item.title}
                </h3>
                {item.content}
            </div>
        </div>
    );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 flex flex-col items-center">
         <div className="flex justify-center mb-6">
            <div className="border border-[#e63946]/20 bg-[#fff5f6] py-1 px-4 rounded-full text-[#e63946] text-sm font-medium">Process</div>
          </div>
        <h2 className="text-3xl md:text-5xl mb-6 text-[#2b2d42] max-w-4xl font-extrabold text-center tracking-tight">
          How It Works
        </h2>
        <p className="text-[#555] text-lg md:text-xl max-w-xl text-center">
          Plan your dream trip in just a few simple steps.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
           <TimelineItem 
             key={index} 
             item={item} 
             scrollYProgress={scrollYProgress} 
             timelineHeight={height} 
           />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#e63946] via-[#f77f86] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
