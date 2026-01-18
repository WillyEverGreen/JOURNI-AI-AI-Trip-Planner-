import React, { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Loader({ onComplete }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Keep a timer to transition away from the loader
    const timer = setTimeout(() => {
        setComplete(true);
        if (onComplete) onComplete();
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center bg-[#FAFAFA] transition-opacity duration-500 ${complete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
       <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="w-[150px] h-[150px] md:w-[500px] md:h-[500px] flex-shrink-0"
       >
        <DotLottieReact
          src="https://lottie.host/6d0db870-8f21-41b0-b0b3-8c06a30e6a0c/Jc576gXr5p.lottie"
          loop
          autoplay
        />
      </motion.div>
    </div>
  );
}
