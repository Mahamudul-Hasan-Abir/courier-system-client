import DeliveryItems from "@/components/DelivaryItems/DelivaryItems";
import Hero from "@/components/Hero/Hero";
import Phone from "@/components/Phone/Phone";
import SecondaryHero from "@/components/SecondaryHero/SecondaryHero";
import TryUs from "@/components/TryUs/TryUs";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <SecondaryHero></SecondaryHero>
      <TryUs></TryUs>
      <DeliveryItems></DeliveryItems>
      <Phone></Phone>
    </div>
  );
}
