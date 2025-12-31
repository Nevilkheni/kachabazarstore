import Coupons from "./coupon/page";
import HeroSlider from "./heroslider/page";

export default function Hero() {
  return (
    <>
      <div className="py-5">
        <div className="flex max-w-[1535px] mx-auto justify-between px-3 sm:px-10">
          <HeroSlider />
          <Coupons />
        </div>
        <div className="w-full max-w-[1535px] mx-auto px-3 sm:px-10">
          <div className=" flex justify-between rounded-lg bg-[#ffedd4] px-10 py-6 mt-6">
            <div>
              <h2 className="text-[20px] font-bold text-emerald-600 leading-7">
                100% Natural Quality Organic Product
              </h2>
              <p className="text-gray-500 text-[16px]">
                See Our latest discounted products from here and get a special
                discount product
              </p>
            </div>
            <button className="cursor-pointer bg-emerald-500 hover:bg-green-700 text-white font-semibold text-sm rounded-full px-6 my-auto py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
