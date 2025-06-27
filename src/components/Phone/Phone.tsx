import { Car, DollarSignIcon, ShieldHalf } from "lucide-react";
import phoneImage from "../../../public/assets/phoneImage.png";
import Image from "next/image";
import { Truck } from "lucide-react";
import Link from "next/link";

const Phone = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#23272b] via-[#40494f] to-[#40494f] overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-24 right-0 w-[300px] h-[300px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
      <div className="flex flex-col md:flex-row w-full max-w-5xl text-white py-16 md:py-20 mx-auto items-center md:items-stretch relative z-10">
        {/* Phone image: right for desktop, top for mobile */}
        <div className="w-full md:w-1/3 flex justify-center items-center order-1 md:order-2 mb-10 md:mb-0 relative">
          <div className="relative w-[220px] h-[420px] md:w-[260px] md:h-[480px] rounded-3xl shadow-2xl overflow-hidden border-4 border-white/10 bg-white/5">
            <Image
              src={phoneImage}
              alt="phone image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Text and features: left for desktop, bottom for mobile */}
        <div className="w-full md:w-2/3 flex flex-col justify-center order-2 md:order-1 px-4">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="bg-[#f39f39] rounded-full p-2 shadow-sm border border-orange-200 group-hover:scale-105 transition">
              <Truck className="size-7 text-white" />
            </div>
            <span className="ml-2 text-xl font-extrabold tracking-tight text-[#f39f39] group-hover:text-white transition">
              Courier<span className="text-white">X</span>
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left mb-4 leading-tight drop-shadow-lg">
            Order from our apps and get{" "}
            <span className="text-[#f39f39]">special offer</span>
          </h1>
          <p className="text-lg text-gray-200 text-center md:text-left mb-8 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            ultricies tincidunt nulla vel cursus. Fusce egestas quis est non
            feugiat. Maecenas faucibus nunc in enim fringilla semper.
          </p>
          <div>
            <div className="flex gap-6 items-center mb-5 group hover:bg-white/10 rounded-lg p-3 transition">
              <div className="rounded-full bg-[#f39f39] p-2 shadow">
                <DollarSignIcon className="size-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Cashback Bonus</h3>
            </div>
            <div className="flex gap-6 items-center mb-5 group hover:bg-white/10 rounded-lg p-3 transition">
              <div className="rounded-full bg-[#f39f39] p-2 shadow">
                <ShieldHalf className="size-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Secure Payment</h3>
            </div>
            <div className="flex gap-6 items-center mb-5 group hover:bg-white/10 rounded-lg p-3 transition">
              <div className="rounded-full bg-[#f39f39] p-2 shadow">
                <Car className="size-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Free Shipping</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-[#f39f39]/20 rounded-full blur-2xl z-0" />
    </section>
  );
};

export default Phone;
