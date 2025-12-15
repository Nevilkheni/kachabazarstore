"use client";
import React from "react";
import { LuTruck, LuPhoneCall, LuCreditCard, LuGift } from "react-icons/lu";

export default function FeatureStrip() {
  return (
    <section className="hidden lg:block bg-white px-10 border-b border-indigo-100">
      <div className="max-w-[1456px] mx-auto py-4  grid grid-cols-2 md:grid-cols-4 items-center text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="flex items-center justify-center gap-3 py-3">
          <LuTruck className="text-emerald-600 text-lg" />
          <p className="text-sm font-medium text-gray-800">
            Free Shipping From €500.00
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-3">
          <LuPhoneCall className="text-emerald-600 text-lg" />
          <p className="text-sm font-medium text-gray-800">
            Support 24/7 At Anytime
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-3">
          <LuCreditCard className="text-emerald-600 text-lg" />
          <p className="text-sm font-medium text-gray-800">
            Secure Payment Totally Safe
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-3">
          <LuGift className="text-emerald-600 text-lg" />
          <p className="text-sm font-medium text-gray-800">
            Latest Offer Upto 20% Off
          </p>
        </div>
      </div>
    </section>
  );
}
