import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useRevealOnScroll from "./useRevealOnScroll";

export default function CTA() {
  useRevealOnScroll();
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div
        data-reveal
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-[#2b2d42] to-[#1f2230] p-8 md:p-12 text-center text-white shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]"
        style={{ transitionDelay: "100ms" }}
      >
        <h3 className="text-2xl md:text-3xl font-bold">
          Ready to plan your next trip?
        </h3>
        <p className="mt-2 text-white/80">
          Create your first itinerary in under a minute.
        </p>
        <div className="mt-6">
          <Link to="/create-trip">
            <Button className="bg-[#e63946] hover:bg-[#d1323f] text-white rounded-lg px-6 py-5 md:py-6 text-base md:text-lg">
              Start Planning — Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
