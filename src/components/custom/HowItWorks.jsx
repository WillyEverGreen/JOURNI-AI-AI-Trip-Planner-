import React from "react";
import { Sparkles, LocateFixed, Plane } from "lucide-react";
import useRevealOnScroll from "./useRevealOnScroll";

const steps = [
  {
    title: "Tell us your vibe",
    desc: "Where, when, budget, and what you love.",
    icon: Sparkles,
  },
  {
    title: "We craft your plan",
    desc: "AI builds a personal itinerary with attractions, food, and stays.",
    icon: LocateFixed,
  },
  {
    title: "Save, share, and go",
    desc: "Tweak it, view it on map, and explore stress-free.",
    icon: Plane,
  },
];

export default function HowItWorks() {
  useRevealOnScroll();
  return (
    <section id="how-it-works" className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="text-center text-3xl md:text-4xl font-extrabold text-[#2b2d42]"
          style={{ transitionDelay: "60ms" }}
        >
          How it works
        </h2>
        <p
          data-reveal
          className="mx-auto mt-3 max-w-2xl text-center text-[#8d99ae]"
          style={{ transitionDelay: "140ms" }}
        >
          In three simple steps from idea to itinerary.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              data-reveal
              key={s.title}
              className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]"
              style={{ transitionDelay: `${120 + i * 100}ms` }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b2d42]/10 text-[#2b2d42]">
                {React.createElement(s.icon, { size: 24 })}
                {/* we use react.createElement as we cand hardcore put info in <Sparkles/> like description, title */}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#2b2d42]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
