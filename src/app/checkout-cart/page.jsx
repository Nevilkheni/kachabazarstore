import CartItem from "./cartItem/page";
import OrderSummary from "./orderSummary/page";

export default function CheckoutcartPage() {
  return (
    <div className="bg-[#f9fafb] text-black lg:h-screen 2xl:h-auto lg:overflow-hidden">
      <div className="flex flex-col lg:flex-row   gap-10 xl:gap-20 max-w-[1536px] mx-auto px-3 sm:px-10 pt-16 pb-16 h-full">
        <div className=" lg:w-[70%] xl:w-[62%] scrollbar-hide  lg:overflow-y-auto ">
          <CartItem />
        </div>

        <div className="w-px bg-gray-200"></div>

        <div className="w-full lg:w-[30%]  xl:w-[38%]">
          <div className="lg:sticky top-16">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
