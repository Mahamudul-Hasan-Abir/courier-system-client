"use client";
import Lottie from "lottie-react";
import lottieData from "../../../public/lottie/2.json";
import { Button } from "../ui/button";
import { Truck } from "lucide-react";
import Link from "next/link";

const SecondaryHero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-24 right-0 w-[350px] h-[350px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
      <div className="flex flex-col md:flex-row w-full max-w-6xl py-14 md:py-20 mx-auto items-center md:items-stretch relative z-10">
        {/* Lottie: left on desktop, top on mobile */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 mb-10 md:mb-0">
          <Lottie
            animationData={lottieData}
            loop
            autoplay
            style={{ width: 340, height: 340 }}
          />
        </div>
        {/* Text and CTA: right on desktop, bottom on mobile */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 px-4">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="bg-[#f39f39] rounded-full p-2 shadow-sm border border-orange-200 group-hover:scale-105 transition">
              <Truck className="size-7 text-white" />
            </div>
            <span className="ml-2 text-xl font-extrabold tracking-tight text-[#f39f39] group-hover:text-black transition">
              Courier<span className="text-black">X</span>
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left mb-4 leading-tight drop-shadow-lg text-gray-900">
            Do you want a <span className="text-[#f39f39]">fast service?</span>{" "}
            Just call us.
          </h1>
          <p className="text-lg text-gray-600 text-center md:text-left mb-8 max-w-xl">
            Aenean quis sagittis sem. Sed volutpat quam a imperdiet volutpat.
            Quisque maximus nibh elit, nec molestie erat tincidunt sit amet.
            Duis nec ante molestie, volutpat mi ac, convallis quam. Fusce
            laoreet bibendum luctus. Maecenas malesuada fermentum mi.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-[#f39f39] text-white font-semibold rounded-md px-8 py-3 hover:bg-black hover:text-[#f39f39] transition shadow text-lg">
              Call Us
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
    </section>
  );
};

export default SecondaryHero;
