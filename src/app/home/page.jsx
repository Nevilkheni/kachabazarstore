import Hero from "./herosection/page";
import DownloadAppSection from "./downloadappSection/page";
import FeaturedCategories from "./featuredcategories/page";
import LatestProducts from "./latestproducts.jsx/page";
import PopularProducts from "./popularproducts/page";

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
