import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import useRevealOnScroll from "./useRevealOnScroll"; // Unused
import { AuroraBackground } from "../ui/aurora-background";
import heroImg from "../../assets/hero-img.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".hero-image",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      );
  }, { scope: containerRef });

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
       {/* Removed old gradient divs */}
       <AuroraBackground className="justify-start pt-10 md:pt-20">
      <div 
        className="relative z-10 px-6 flex flex-col items-center justify-center"
      >
        <div className="mx-auto max-w-6xl text-center">
          <span
            className="hero-badge inline-block rounded-full border border-[#e63946]/20 bg-white/60 px-4 py-1 text-sm font-medium text-[#e63946] shadow-sm backdrop-blur opacity-0"
          >
            AI Trip Planner
          </span>
          <h1
            className="hero-title mt-2 md:mt-5 font-extrabold tracking-tight text-2xl md:text-5xl lg:text-6xl leading-tight text-[#2b2d42] opacity-0"
          >
            Discover Your Next Adventure with
            <span className="block text-[#e63946]">
              Smart, Personalized Plans
            </span>
          </h1>
          <p
            className="hero-desc mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#555] opacity-0"
          >
            Plan trips effortlessly with AI—tailored itineraries, must-see
            spots, and picture-perfect recommendations, all in seconds.
          </p>

          <div
            className="hero-buttons mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0"
          >
            <Link to="/create-trip">
              <Button className="bg-[#2b2d42] hover:bg-[#222534] text-white rounded-lg px-6 py-5 md:py-6 text-base md:text-lg">
                Get Started — It’s Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="secondary"
                className="border border-[#2b2d42]/20 bg-white hover:bg-white/80 text-[#2b2d42] rounded-lg px-6 py-5 md:py-6 text-base md:text-lg"
              >
                How it works
              </Button>
            </a>
          </div>

          <div
            className="hero-image relative mx-auto mt-14 max-w-4xl rounded-2xl border border-black/5 bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] opacity-0"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={heroImg}
                alt="Travel inspiration"
                className="w-full h-auto object-contain rounded-xl"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;
