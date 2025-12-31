"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoReturnUpBack } from "react-icons/io5";
import CouponApply from "@/components/coupon/CouponApply";
import { useCouponContext } from "@/contexts/CouponContext";

export default function OrderSummary() {
  const { totalAmount } = useSelector((state) => state.cart);

  const {
    couponDiscount,
  } = useCouponContext();

  const total = totalAmount - couponDiscount;

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="p-8">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        <div className="flex justify-between text-sm py-3 border-b border-gray-200">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm py-3 border-b border-gray-200">
          <span className="text-gray-600">Discount</span>
          <span className="text-orange-400 font-medium">${couponDiscount.toFixed(2)}</span>
        </div>

        <CouponApply
          totalAmount={totalAmount}
          className="mt-6"
        />
      </div>

      <div className="bg-neutral-100 px-8 py-10 lg:py-6">
        <div className="flex justify-between items-center font-semibold text-md">
          <span>TOTAL COST</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Shipping and taxes calculated at checkout.
        </p>

        <div className="flex justify-center text-center gap-3 mt-6">
          <Link
            href="/"
            className="flex border justify-center w-full border-gray-200 bg-white rounded-lg py-2 text-sm font-medium text-center hover:bg-gray-100"
          >
            <IoReturnUpBack className="mr-2 my-auto" /> Continue Shipping
          </Link>

          <Link
            href="/checkout-cart/checkout"
            className="flex w-full bg-emerald-500 justify-center text-white rounded-lg py-2 text-sm font-medium text-center hover:bg-emerald-600"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}