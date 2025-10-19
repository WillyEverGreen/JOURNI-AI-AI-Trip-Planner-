import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useRevealOnScroll from "./useRevealOnScroll";
import heroImg from "../../assets/hero-img.jpg";

function Hero() {
  useRevealOnScroll();

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient and animated blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fff5f6] via-white to-[#f6f7fb]" />
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#e63946]/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#2b2d42]/10 blur-3xl animate-float-delayed" />

      <div className="px-6 py-24 md:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <span
            data-reveal
            className="inline-block rounded-full border border-[#e63946]/20 bg-white/60 px-4 py-1 text-sm font-medium text-[#e63946] shadow-sm backdrop-blur"
            style={{ transitionDelay: "50ms" }}
          >
            AI Trip Planner
          </span>
          <h1
            data-reveal
            className="mt-5 font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight text-[#2b2d42]"
            style={{ transitionDelay: "120ms" }}
          >
            Discover Your Next Adventure with
            <span className="block text-[#e63946]">
              Smart, Personalized Plans
            </span>
          </h1>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#8d99ae]"
            style={{ transitionDelay: "200ms" }}
          >
            Plan trips effortlessly with AI—tailored itineraries, must-see
            spots, and picture-perfect recommendations, all in seconds.
          </p>

          <div
            data-reveal
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ transitionDelay: "280ms" }}
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
            data-reveal
            className="relative mx-auto mt-14 max-w-4xl rounded-2xl border border-black/5 bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
            style={{ transitionDelay: "360ms" }}
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={heroImg}
                alt="Travel inspiration"
                className="w-full h-56 md:h-80 lg:h-96 object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
