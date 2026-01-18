import React, { useState } from "react";
import "./App.css";
import Hero from "./components/custom/hero";
import Features from "./components/custom/Features";
import Testimonials from "./components/custom/Testimonials";
import HowItWorks from "./components/custom/HowItWorks";
import CTA from "./components/custom/CTA";
import Header from "./components/custom/header";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import Loader from "./components/custom/Loader";
import ScrollProgressCar from "./components/custom/ScrollProgressCar";
import { Footer7 } from "./components/ui/footer-7";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
         className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50" 
      >
        <Header />
      </motion.div>
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CTA />
      <Footer7 />
      <ScrollProgressCar />
    </>
  );
}

export default App;
