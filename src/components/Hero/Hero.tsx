"use client";
import Lottie from "lottie-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import lottieData from "../../../public/lottie/1.json";

const Hero = () => {
  return (
    <div className=" bg-[#40494f]">
      <div className="flex flex-col md:flex-row w-full max-w-5xl text-white py-10 mx-auto items-center md:items-stretch ">
        {/* Lottie on top for mobile, right for desktop */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-6 md:mb-0">
          <Lottie
            animationData={lottieData}
            loop
            autoplay
            style={{ width: 600, height: 600 }}
          />
        </div>
        {/* Text and form on bottom for mobile, left for desktop */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-4">
            Reliable service every time
          </h1>
          <p className="text-center md:text-left mb-6">
            Nullam ac aliquam purus. Donec tempor, metus sed porttitor posuere,
            elit sapien rutrum elit, eget tincidunt nisl tortor nec metus. Donec
            tempor rhoncus convallis.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
            <Input
              type="email"
              className="w-full bg-white"
              placeholder="Enter your email"
            />
            <Button className="w-full md:w-auto bg-[#f39f39] md:px-6">
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
