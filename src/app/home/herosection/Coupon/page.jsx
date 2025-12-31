"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const coupons = [
  {
    id: 1,
    title: "August Gift Voucher",
    discount: "50%",
    code: "AUGUST24",
    minPurchase: 2000,
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FPDLPDHc%2Fins1.jpg&w=256&q=75",
    active: false,
    endDate: "2024-08-31T00:00:00",
  },
  {
    id: 2,
    title: "Summer Gift Voucher",
    discount: "10%",
    code: "SUMMER24",
    minPurchase: 1000,
    img: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F4thS4Z1%2Fins2.jpg&w=256&q=75",
    active: false,
    endDate: "2024-09-30T00:00:00",
  },
];

export default function Coupons() {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      setTimers(newTimers);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" hidden lg:block border-2 hover:border-green-500 border-orange-500 pb-1 2xl:pb-6 rounded-sm bg-[#f9fafb] shadow-sm min-w-[40%]">
      <div className="text-center bg-[#ffedd4] py-2 border-b border-gray-200 font-sans font-medium text-gray-700 rounded-md mb-4 text-md">
        Latest Super Discount Active Coupon Code
      </div>

      <div className="space-y-4">
        {coupons.map((coupon) => {
          const timer = timers[coupon.id] || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };

          return (
            <div
              key={coupon.id}
              className="flex items-center justify-between  rounded-lg m-4 px-3 mt-5 h-auto bg-white relative overflow-hidden"
              style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px" }}
            >
              <div className="flex  gap-3 py-2">
                <div className="w-auto h-auto  my-auto  xl:h-[100px] xl:w-[100px] rounded-lg xl:rounded-xl overflow-hidden">
                  <Image
                    src={coupon.img}
                    alt={coupon.title}
                    width={100}
                    height={100}
                    className="object-cover m-auto w-full h-full"
                  />
                </div>

                <div className="px-1 py-0.5">
                  <div className="flex items-center">
                    <span className="text-xl font-sans font-bold text-red-500">
                      {coupon.discount}
                      <span className="text-gray-600 text-[16px] px-1 font-medium">
                        Off
                      </span>
                    </span>
                    <span
                      className={` text-xs mx-1 px-4 py-1 font-medium rounded-full ${coupon.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="text-gray-700 font-medium font-sans text-md">
                    {coupon.title}
                  </div>

                  <div className="flex items-center text-white mt-2">
                    {["days", "hours", "minutes", "seconds"].map(
                      (key, i, arr) => (
                        <div key={i} className="flex items-center">
                          <div className="bg-[#fb2c36] px-2 py-1  rounded text-sm font-medium font-sans">
                            {String(timer[key]).padStart(2, "0")}
                          </div>
                          {i < arr.length - 1 && (
                            <span className="text-black font-sans font-semibold mx-1">
                              :
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="border-l-2 border-dashed border-gray-200 my-2 mx-3 "></div>

                <div className="text-start m-1 ">
                  <button className="border text-sm font-sans  w-full cursor-pointer border-green-300 bg-green-50 border-dashed rounded-xl xl:px-4 py-2 mb-2 text-green-600 font-medium   transition">
                    SUMMER24
                  </button>

                  <div className="text-xs w-auto text-gray-500 ">
                    <p>* This coupon apply when</p>
                    <p>
                      shopping more than $
                      <span className="font-bold">1000</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
