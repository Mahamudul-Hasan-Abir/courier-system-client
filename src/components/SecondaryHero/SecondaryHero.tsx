"use client";
import Lottie from "lottie-react";
import lottieData from "../../../public/lottie/2.json";

import { Button } from "../ui/button";
const SecondaryHero = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full max-w-5xl  py-10 mx-auto items-center md:items-stretch ">
        {/* Lottie: left on desktop, top on mobile */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 mb-6 md:mb-0">
          <Lottie
            animationData={lottieData}
            loop
            autoplay
            style={{ width: 600, height: 600 }}
          />
        </div>
        {/* Text and form: right on desktop, bottom on mobile */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-4">
            Do you want a fast service? Just call us.
          </h1>
          <p className="text-center md:text-left mb-6">
            Aenean quis sagittis sem. Sed volutpat quam a imperdiet volutpat.
            Quisque maximus nibh elit, nec molestie erat tincidunt sit amet.
            Duis nec ante molestie, volutpat mi ac, convallis quam. Fusce
            laoreet bibendum luctus. Maecenas malesuada fermentum mi.
          </p>
          <Button className=" bg-[#f39f39]">Call Us</Button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHero;
