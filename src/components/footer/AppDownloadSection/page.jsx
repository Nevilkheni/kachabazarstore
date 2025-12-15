"use client";
import Image from "next/image";
import React from "react";

export default function AppDownloadSection() {
  return (
    <section className="w-full px-4 sm:px-10 bg-indigo-50">
      <div className="   mx-auto max-w-[1456px] ">
        <div className="grid py-10 lg:py-16 md:grid-cols-2 lg:grid-cols-3 items-center gap-3">
          <div className="hidden md:flex min-h-full min-w-full p-1 ">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688091%2Fsettings%2Fapp-download-img-left_s5n2zf.webp&w=1080&q=75"
              alt="Shopping illustration left"
              width={400}
              height={300}
              className="object-cover min-h-full min-w-full "
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 ">
              Get Your Daily Needs From Our KachaBazar Store
            </h2>
            <p className="text-gray-600 my-3 mb-8 leading-7">
              There are many products you will find in our shop. Choose your
              daily necessary product from our KachaBazar shop and get some
              special offers.
            </p>
            <div className="flex   justify-center gap-2 pl-2">
              <a href="https://play.google.com/store/games?utm_source=apac_med&utm_medium=hasem&utm_content=Jun0122&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-lk-1003227-med-hasem-py-Evergreen-Jun0122-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700071429441653_creativeid_600975795576_device_c&gclid=CjwKCAjwwo-WBhAMEiwAV4dybdy60tnQqCSnQ-cXShNnEcxmaBx2I6iwwc_WEqoA5sN9YSLJEXh9fBoC3u4QAvD_BwE&gclsrc=aw.ds&pli=1">
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1697688165/settings/app-store_cyyc0f.svg"
                  alt="App Store"
                  width={210}
                  height={60}
                  className="cursor-pointer"
                />
              </a>
              <a href="https://www.apple.com/app-store/">
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1697688167/settings/play-store_cavwua.svg"
                  alt="Google Play"
                  width={210}
                  height={60}
                  className="cursor-pointer"
                />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688091%2Fsettings%2Fapp-download-img_c7xqg4.webp&w=1080&q=75"
              alt="Shopping illustration right"
              width={400}
              height={300}
              className="object-cover min-h-full min-w-full "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
