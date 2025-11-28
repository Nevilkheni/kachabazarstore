"use client";
import Image from "next/image";

export default function CouponsSection() {
  return (
    <div>
      <div className="relative w-full">
        <div
          className="flex justify-center items-center py-10 lg:py-20 w-full bg-cover bg-no-repeat bg-bottom"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/ahossain/image/upload/v1697439245/settings/yw3cd2xupqwqpqcbxv9l.jpg")',
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black text-center">
            Mega Offer
          </h1>
        </div>
      </div>
      <div className="w-full px-10 bg-[#f9fafb] py-20">
        <div className="max-w-[1456px] flex mx-auto justify-center gap-6">
          <div className="flex  bg-white rounded-2xl shadow-sm overflow-hidden relative  border border-gray-100">
            <div className="flex items-center gap-4 p-6 min-w-[380px]">
              <div className="w-[120px] h-[120px] overflow-hidden rounded-lg">
                <Image
                  src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F4thS4Z1%2Fins2.jpg&w=256&q=75"
                  alt="Summer Gift Voucher"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="bg-[#fdecea] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    00
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#fdecea] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    00
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#fdecea] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    00
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#fdecea] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    00
                  </span>
                </div>
                <h3 className="text-gray-800 font-semibold text-lg">
                  Summer Gift Voucher
                </h3>
                <p className="text-red-600 font-bold text-lg mt-1">
                  10%{" "}
                  <span className="text-gray-600 font-normal text-sm">Off</span>
                </p>
              </div>
            </div>

            <div className="w-0.5 border-l border-dashed border-gray-200 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f9fafb] rounded-full" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f9fafb] rounded-full" />
            </div>

            <div className="flex flex-col justify-center px-6 py-4 min-w-[280px]">
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className="text-gray-700 font-medium">Coupon</span>
                <span className="text-red-500 font-semibold">Inactive</span>
              </div>
              <div className="border border-green-400 rounded-lg text-center py-2 text-green-600 font-semibold text-sm mb-3">
                SUMMER24
              </div>
              <p className="text-gray-600 text-sm leading-snug">
                * This coupon code will apply on when you shopping more then
                <br />
                <span className="font-semibold text-gray-800">$1000</span>
              </p>
            </div>
          </div>

          <div className="flex bg-white rounded-2xl shadow-sm overflow-hidden relative max-w-3xl border border-gray-100">
            <div className="flex items-center gap-4 p-6 min-w-[380px]">
              <div className="w-[120px] h-[120px] overflow-hidden rounded-lg">
                <Image
                  src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F23kQcB9%2Fins3.jpg&w=256&q=75"
                  alt="Summer Gift Voucher"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="bg-[#e8f8f2] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    347
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#e8f8f2] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    13
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#e8f8f2] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    35
                  </span>
                  <span className="text-gray-700 font-semibold">:</span>
                  <span className="bg-[#e8f8f2] text-gray-700 text-sm font-semibold px-2 py-1 rounded-md">
                    27
                  </span>
                </div>
                <h3 className="text-gray-800 font-semibold text-lg">
                  Summer Gift Voucher
                </h3>
                <p className="text-red-600 font-bold text-lg mt-1">
                  10%{" "}
                  <span className="text-gray-600 font-normal text-sm">Off</span>
                </p>
              </div>
            </div>

            <div className="w-0.5 border-l border-dashed border-gray-200 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f9fafb] rounded-full" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#f9fafb] rounded-full" />
            </div>

            <div className="flex flex-col justify-center px-6 py-4 min-w-[280px]">
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className="text-gray-700 font-medium">Coupon</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
              <div className="border border-green-400 rounded-lg text-center py-2 text-green-600 font-semibold text-sm mb-3">
                SUMMER26
              </div>
              <p className="text-gray-600 text-sm leading-snug">
                * This coupon code will apply on when you shopping more then
                <br />
                <span className="font-semibold text-gray-800">$500</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
