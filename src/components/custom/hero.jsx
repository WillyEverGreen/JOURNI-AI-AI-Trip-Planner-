import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-24 px-6 text-center">
      <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
        <span className="text-[#e63946]">
          Discover Your Next Adventures with AI:
        </span>
        <br />
        <span className="text-[#2b2d42]">
          Personalized Plans at Your Fingertips
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-[#8d99ae]">
        Plan your trips effortlessly with personalized recommendations tailored
        just for you.
      </p>

      <Link to="/create-trip">
        <Button
          variant="secondary"
          className=" bg-[#2b2d42] text-white rounded-lg m-2 cursor-pointer"
        >
          Get Started it's Free
        </Button>
      </Link>
    </section>
  );
}

export default Hero;
