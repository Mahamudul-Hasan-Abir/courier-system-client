"use client";
import { Button } from "../ui/button";
import lottieData1 from "../../../public/lottie/3.json";
import lottieData2 from "../../../public/lottie/4.json";
import lottieData3 from "../../../public/lottie/10.json";
import lottieData4 from "../../../public/lottie/11.json";
import Lottie from "lottie-react";
import { Truck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    lottie: lottieData1,
    title: "Swift Delivery",
    desc: "Get your parcels delivered at lightning speed with our optimized routes and dedicated team.",
  },
  {
    lottie: lottieData2,
    title: "Trusted Service",
    desc: "Thousands of happy customers trust CourierX for safe and reliable delivery every time.",
  },
  {
    lottie: lottieData3,
    title: "Vaccinated Courier",
    desc: "All our couriers are fully vaccinated and follow strict safety protocols for your peace of mind.",
  },
  {
    lottie: lottieData4,
    title: "Safety Protocol",
    desc: "We ensure the highest standards of hygiene and safety throughout the delivery process.",
  },
];

const TryUs = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-24 left-0 w-[350px] h-[350px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
      {/* Top Section */}
      <div className="bg-[#263138] py-16 md:py-20 flex flex-col items-center relative z-10">
        {/* Branding */}
        <Link href="/" className="flex items-center gap-2 mb-6 group">
          <div className="bg-[#f39f39] rounded-full p-2 shadow-sm border border-orange-200 group-hover:scale-105 transition">
            <Truck className="size-7 text-white" />
          </div>
          <span className="ml-2 text-xl font-extrabold tracking-tight text-[#f39f39] group-hover:text-white transition">
            Courier<span className="text-white">X</span>
          </span>
        </Link>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
          Try us and see how good <br /> our services are.
        </h2>
        <p className="text-lg text-gray-200 text-center mb-10 max-w-2xl">
          Discover why thousands trust{" "}
          <span className="text-[#f39f39] font-semibold">CourierX</span> for
          their delivery needs. Experience speed, safety, and reliability like
          never before.
        </p>
        <Button className="bg-[#f39f39] text-white font-semibold rounded-md px-8 py-3 hover:bg-black hover:text-[#f39f39] transition shadow text-lg">
          Learn More
        </Button>
      </div>
      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative z-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl border border-orange-50 group"
          >
            <div className="mb-4">
              <Lottie
                animationData={feature.lottie}
                loop
                autoplay
                style={{ width: 120, height: 120 }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#f39f39] transition">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
    </section>
  );
};

export default TryUs;
