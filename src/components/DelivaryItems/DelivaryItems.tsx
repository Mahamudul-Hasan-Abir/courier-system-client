import Image from "next/image";
import item from "../../../public/assets/gro.png";
import item2 from "../../../public/assets/burg.png";
import item3 from "../../../public/assets/box.png";
import { Button } from "../ui/button";

const DeliveryItems = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-3 gap-5 mx-0 md:mx-5 lg:mx-0">
        <div className="border rounded-2xl shadow-md my-40 bg-[#f0efe6] relative col-span-3 md:col-span-1 mx-6 md:mx-0">
          <div className="size-40 overflow-hidden absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[100px]">
            <div className="relative">
              <Image
                src={item}
                alt="Mahamudul Hasan Abir photo"
                width={400}
                height={400}
              ></Image>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center pt-30">
            Food And Drinks
          </h1>
          <p className="text-[#7B7B7B] py-5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper.
          </p>
          <div className="flex justify-center mb-10">
            <Button>Order Now</Button>
          </div>
        </div>
        <div className="hidden md:block border rounded-2xl shadow-md my-40 bg-[#f0efe6] relative col-span-3 md:col-span-1">
          <div className="size-40 overflow-hidden absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[100px]">
            <div className="relative">
              <Image
                src={item2}
                alt="Mahamudul Hasan Abir photo"
                width={500}
                height={500}
              ></Image>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center pt-30">
            Food And Drinks
          </h1>
          <p className="text-[#7B7B7B] py-5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper.
          </p>
          <div className="flex justify-center mb-10">
            <Button>Order Now</Button>
          </div>
        </div>
        <div className="hidden md:block border rounded-2xl shadow-md my-40 bg-[#f0efe6] relative col-span-3 md:col-span-1">
          <div className="size-40 overflow-hidden absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[100px]">
            <div className="relative">
              <Image
                src={item3}
                alt="Mahamudul Hasan Abir photo"
                width={500}
                height={500}
              ></Image>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center pt-30">
            Food And Drinks
          </h1>
          <p className="text-[#7B7B7B] py-5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper.
          </p>
          <div className="flex justify-center mb-10">
            <Button>Order Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryItems;
