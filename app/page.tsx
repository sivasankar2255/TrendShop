import Image from "next/image";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import NewArrivals from "./components/home/NewArrivals";
import Offers from "./components/home/Offers";
import Newsletter from "./components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <NewArrivals />
      <Categories />
      <FeaturedProducts />
      <Offers />
      <Newsletter />
    </main>
  );
}





