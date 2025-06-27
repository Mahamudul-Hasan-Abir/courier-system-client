"use client";
import Lottie from "lottie-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import lottieData from "../../../public/lottie/1.json";
import { Truck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#40494f] via-[#40494f] to-[#23272b] overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#f39f39]/20 rounded-full blur-3xl z-0" />
      <div className="flex flex-col md:flex-row w-full max-w-5xl text-white py-16 md:py-24 mx-auto items-center md:items-stretch relative z-10">
        {/* Lottie on right for desktop, top for mobile */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-10 md:mb-0">
          <Lottie
            animationData={lottieData}
            loop
            autoplay
            style={{ width: 420, height: 420 }}
          />
        </div>
        {/* Text and form on left for desktop, bottom for mobile */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="bg-[#f39f39] rounded-full p-2 shadow-sm border border-orange-200 group-hover:scale-105 transition">
              <Truck className="size-7 text-white" />
            </div>
            <span className="ml-2 text-2xl font-extrabold tracking-tight text-[#f39f39] group-hover:text-white transition">
              Courier<span className="text-white">X</span>
            </span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center md:text-left mb-4 leading-tight drop-shadow-lg">
            Fast. Reliable. <span className="text-[#f39f39]">CourierX</span>{" "}
            Delivery
          </h1>
          <p className="text-lg md:text-xl text-gray-200 text-center md:text-left mb-8 max-w-xl">
            Your trusted partner for same-day, secure, and affordable parcel
            delivery. Experience the future of logistics with{" "}
            <span className="text-[#f39f39] font-semibold">CourierX</span>.
          </p>
          <form className="flex flex-col md:flex-row gap-3 md:gap-5 w-full max-w-md mx-auto md:mx-0">
            <Input
              type="email"
              className="w-full bg-white/90 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#f39f39] focus:border-[#f39f39] transition rounded-md shadow"
              placeholder="Enter your email"
            />
            <Button className="w-full md:w-auto bg-[#f39f39] md:px-8 text-white font-semibold rounded-md hover:bg-black hover:text-[#f39f39] transition shadow">
              Get Started
            </Button>
          </form>
        </div>
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
    </section>
  );
};

export default Hero;
