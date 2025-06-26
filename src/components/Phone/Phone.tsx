import { Car, DollarSignIcon, ShieldHalf } from "lucide-react";
import phoneImage from "../../../public/assets/phoneImage.png";
import Image from "next/image";

const Phone = () => {
  return (
    <div className=" bg-[#40494f]">
      <div className="flex flex-col md:flex-row w-full max-w-5xl text-white py-10 mx-auto items-center md:items-stretch ">
        {/* Lottie on top for mobile, right for desktop */}
        <div className="w-full md:w-1/3 flex justify-center items-center order-1 md:order-2 mb-6 md:mb-0 relative">
          <Image src={phoneImage} alt="phone image" fill></Image>
        </div>
        {/* Text and form on bottom for mobile, left for desktop */}
        <div className="w-full md:w-2/3 flex flex-col justify-center order-2 md:order-1 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-4">
            Order from our apps and get special offer
          </h1>
          <p className="text-center md:text-left mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            ultricies tincidunt nulla vel cursus. Fusce egestas quis est non
            feugiat. Maecenas faucibus nunc in enim fringilla semper.
          </p>
          <div>
            <div className="flex gap-6 items-center  mb-5">
              <div className="rounded-full bg-[#f39f39] p-2">
                <DollarSignIcon className="size-10"></DollarSignIcon>
              </div>
              <h3 className="text-3xl font-bold">Cashback Bonus</h3>
            </div>
            <div className="flex gap-6 items-center  mb-5">
              <div className="rounded-full bg-[#f39f39] p-2">
                <ShieldHalf className="size-10"></ShieldHalf>
              </div>
              <h3 className="text-3xl font-bold">Secure Payment</h3>
            </div>
            <div className="flex gap-6  items-center  mb-5">
              <div className="rounded-full bg-[#f39f39] p-2">
                <Car className="size-10"></Car>
              </div>
              <h3 className="text-3xl font-bold">Free Shipping</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
