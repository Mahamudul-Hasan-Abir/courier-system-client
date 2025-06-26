"use client";
import { Button } from "../ui/button";
import lottieData1 from "../../../public/lottie/3.json";
import lottieData2 from "../../../public/lottie/4.json";
import lottieData3 from "../../../public/lottie/10.json";
import lottieData4 from "../../../public/lottie/11.json";
import Lottie from "lottie-react";

const TryUs = () => {
  return (
    <div>
      <div className="bg-[#263138] h-[400px] md:h-[350px] flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-white">
            Try us and see how good <br /> our services are.
          </h2>
          <div className="w-full flex justify-center my-10">
            <Button className="bg-[#f39f39] px-3 w-full md:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          <div className="flex flex-col items-center text-center">
            <Lottie
              animationData={lottieData1}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-2xl font-semibold  mt-2">Swift Delivery</h3>
            <p className=" text-sm">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Lottie
              animationData={lottieData2}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-2xl font-semibold  mt-2">Trusted Service</h3>
            <p className=" text-sm">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Lottie
              animationData={lottieData3}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-2xl font-semibold  mt-2">Vaccinated Courier</h3>
            <p className=" text-sm">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Lottie
              animationData={lottieData4}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <h3 className="text-2xl font-semibold  mt-2">Safety Protocol</h3>
            <p className=" text-sm">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryUs;
