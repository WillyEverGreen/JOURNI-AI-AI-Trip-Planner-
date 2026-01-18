import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useScroll, useTransform, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
// Actually, in ScrollProgressCar.jsx, motion IS used at line 19: <motion.div ...>
// So why does the lint say it's unused?
// lint: src/components/custom/ScrollProgressCar.jsx#L3 'motion' is defined but never used.
// Line 3: import { motion, useScroll, useTransform } from 'framer-motion';
// Line 19: <motion.div ...>
// This suggests the linter environment (standard) doesn't understand JSX variable usage?
// But it's a React project.
// Maybe I should ignore this rule for this line or file if I'm sure it's used.
// Or maybe I am misreading the code provided in the view_file output?
// Step 1252:
// 3: import { motion, useScroll, useTransform } from 'framer-motion';
// 19: <motion.div ...>
// It IS used. The linter warning is confusing. 
// However, `Loader.jsx` (Step 1253) also has `motion` import and uses `<motion.div>`.
// `App.jsx` (Step 1256) also uses `<motion.div>`.
// `Testimonials.jsx` (Step 1212) imports from "motion/react" but *doesn't* use it.
// So Testimonials is definitely fixable.
// The others (App, Loader, ScrollProgressCar) seem like false positives or misconfiguration.
// I will TRY to fix `Testimonials.jsx` and `Features.jsx` (unused `cn`).
// For the others, I will add `// eslint-disable-line no-unused-vars` or similar if I can't find a reason.
// But wait, `Testimonials` imported from `motion/react` which might be non-standard/wrong path?
// ScrollProgressCar imports from `framer-motion`.
// I'll start with the obvious ones: Testimonials, Features.
// And `server.js`, `api/photo.js`.


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
