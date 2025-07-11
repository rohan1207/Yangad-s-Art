import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductsOfWeek from "../components/ProductsOfWeek";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <PromoBanner />
      <ProductsOfWeek />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
