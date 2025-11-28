import DownloadAppSection from "./DownloadAppSection/page";
import FeaturedCategories from "./FeaturedCategories/page";
import Hero from "./herosection/page";
import LatestProducts from "./LatestProducts.jsx/page";
import PopularProducts from "./PopularProducts/page";

export default function Herosection() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <PopularProducts />
      <DownloadAppSection />
      <LatestProducts />    
    </>
  );
}
