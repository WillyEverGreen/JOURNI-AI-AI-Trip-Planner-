"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow max-w-xs w-full">
                <div className="text-gray-700 leading-relaxed font-medium">"{text}"</div>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={48}
                    height={48}
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-[#2b2d42]">{name}</div>
                    <div className="text-sm text-gray-500 font-medium">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
