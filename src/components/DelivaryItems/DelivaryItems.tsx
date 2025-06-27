import Image from "next/image";
import item from "../../../public/assets/gro.png";
import item2 from "../../../public/assets/burg.png";
import item3 from "../../../public/assets/box.png";
import { Button } from "../ui/button";

const items = [
  {
    image: item,
    title: "Groceries & Essentials",
    desc: "Get your daily groceries and essentials delivered to your doorstep, fresh and fast.",
  },
  {
    image: item2,
    title: "Food & Drinks",
    desc: "Order your favorite meals and beverages from top restaurants and cafes in your city.",
  },
  {
    image: item3,
    title: "Parcels & Packages",
    desc: "Send and receive parcels, gifts, and important documents securely and on time.",
  },
];

const DeliveryItems = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f9fafb] via-white to-[#f9fafb] py-20">
      {/* Decorative background shape */}
      <div className="absolute -top-24 left-0 w-[300px] h-[300px] bg-[#f39f39]/10 rounded-full blur-2xl z-0" />
      <div className="max-w-5xl mx-auto  relative z-10">
        {/* Branding */}
        <div className="py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-3 drop-shadow-lg">
            What can we deliver for you?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From groceries to gifts, CourierX delivers it all. Choose your
            category and experience fast, safe, and reliable delivery.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-24">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-orange-50 rounded-2xl shadow-lg flex flex-col items-center text-center p-8 pt-20 relative transition hover:scale-105 hover:shadow-2xl group"
            >
              <div className="size-32 overflow-hidden absolute left-1/2 -top-16 transform -translate-x-1/2 drop-shadow-xl mx-auto rounded-2xl border-4 border-white bg-white">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-20 mb-2 group-hover:text-[#f39f39] transition">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 text-sm min-h-[48px] flex items-center justify-center">
                {item.desc}
              </p>
              <Button className="bg-[#f39f39] text-white font-semibold rounded-md px-6 py-2 hover:bg-black hover:text-[#f39f39] transition shadow">
                Order Now
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative bottom shape */}
      <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-[#f39f39]/10 rounded-full blur-2xl z-0" />
    </section>
  );
};

export default DeliveryItems;
