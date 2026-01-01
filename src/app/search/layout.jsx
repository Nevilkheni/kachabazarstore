import Footer from "@/components/footer/page";
import Mainheader from "@/components/header/page";
import CategoryBanners from "./CategoryBanners/page";
import FeaturedCategories from "./category/page";

export const metadata = {
    title: "Search Products - Kachabazar",
    description: "Search for your favorite products at Kachabazar",
};

export default function SearchLayout({ children }) {

    return (
        <div className="bg-[#f9fafb]">
            <Mainheader />
            <div className="pt-20 lg:pt-[210px]">
                <CategoryBanners />
            </div>
            <FeaturedCategories />
            <main >
                {children}</main>
            <Footer />
        </div>);
}