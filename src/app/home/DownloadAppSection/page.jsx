"use client";
import Image from "next/image";
import React from "react";

export default function DownloadAppSection() {
  return (
    <section className="w-full flex justify-center bg-gray-50 px-4 sm:px-10 ">
      <div className=" max-w-[1456px] rounded-lg bg-[#00bc7d] flex ">
        <div className="bg-white w-full rounded-xl flex flex-col md:flex-row justify-between items-center m-6 lg:m-16   px-6 py-6 lg:px-10 lg:py-5 ">
          <div className="flex flex-col lg:w-4/5">
            <p className="text-gray-900 text-md lg:text-lg  font-sans">
              Organic Products and Food
            </p>
            <h2 className="text-lg lg:text-2xl  font-bold font-sans mb-1 text-gray-900">
              Quick Delivery to Your Home
            </h2>
            <p className="text-sm font-m font-sans w-full lg:w-[98%] text-gray-800  leading-6">
              There are many products you will find in our shop. Choose your
              daily necessary product from our KachaBazar shop and get some
              special offers. See Our latest discounted products from here and
              get a special discount.
            </p>
            <button className="mt-5 cursor-pointer bg-[#03b77b] text-white text-xs font-medium font-sans py-3 px-8 lg:px-0 mr-auto lg:w-[32.5%]  rounded-full   hover:bg-[#029e6b] transition-all duration-300">
              Download App
            </button>
          </div>

          <div className="hidden md:block mt-6 md:mt-0 w-[20%] lg:w-1/2">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688032%2Fsettings%2Fdelivery-boy_rluuoq.webp&w=750&q=75"
              alt="Delivery illustration"
              width={373}
              height={250}
              className="object-cover w-auto  ml-auto "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
