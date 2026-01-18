import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollProgressCar = () => {
    const { scrollYProgress } = useScroll();
    
    // Map scroll progress (0 to 0.95) to screen width (-10% to 110%)
    const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "100vw"]);
    
    // Fade in/out at the very start and end to avoid abrupt appearance
    const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
    
    // Rotate slightly to match the "uphill/downhill" feel or just keep flat? 
    // Keeping it simple for now as requested.

    return (
        <div className="fixed -bottom-4 left-0 w-full pointer-events-none z-40 h-24 overflow-visible hidden md:block">
           <motion.div 
             style={{ x, opacity }} 
             className="w-16 h-16 md:w-24 md:h-24 absolute bottom-0 left-0"
           >
                <DotLottieReact
                  src="https://lottie.host/6d0db870-8f21-41b0-b0b3-8c06a30e6a0c/Jc576gXr5p.lottie"
                  loop
                  autoplay
                />
           </motion.div>
        </div>
    );
};

export default ScrollProgressCar;
