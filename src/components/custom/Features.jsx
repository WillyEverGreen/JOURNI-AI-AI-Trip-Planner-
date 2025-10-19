import React from "react";
import { Compass, Map, CalendarClock, Camera } from "lucide-react";
import useRevealOnScroll from "./useRevealOnScroll";

const features = [
  {
    title: "Smart Itineraries",
    desc: "AI-curated day-by-day plans that fit your vibe and time.",
    icon: CalendarClock,
  },
  {
    title: "Discover Hidden Gems",
    desc: "Find places locals love, not just tourist traps.",
    icon: Compass,
  },
  {
    title: "Interactive Maps",
    desc: "See everything on a clean, shareable map.",
    icon: Map,
  },
  {
    title: "Picture-Perfect Picks",
    desc: "Rich visuals of hotels, spots, and activities.",
    icon: Camera,
  },
];

export default function Features() {
  useRevealOnScroll();
  return (
    <section className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="text-center text-3xl md:text-4xl font-extrabold text-[#2b2d42]"
          style={{ transitionDelay: "60ms" }}
        >
          Everything you need to plan better
        </h2>
        <p
          data-reveal
          className="mx-auto mt-3 max-w-2xl text-center text-[#8d99ae]"
          style={{ transitionDelay: "140ms" }}
        >
          Built-in smarts and a delightful UI to make trip planning effortless.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              data-reveal
              key={f.title}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]"
              style={{ transitionDelay: `${120 + i * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e63946]/10 text-[#e63946]">
                {React.createElement(f.icon, { size: 24 })}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#2b2d42]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
