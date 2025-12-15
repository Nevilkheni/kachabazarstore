"use client";
import Image from "next/image";
import { FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";

export default function FooterSocialPaymentBottom() {
  return (
    <footer className="w-full">
      <div className="max-w-[1456px] bg-gray-50 border border-gray-100 rounded-lg shadow-sm mx-auto px-4 sm:px-10 py-9">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-8 text-center md:text-left">
          <div className="flex flex-col mr-auto items-center md:items-start gap-3">
            <h4 className="text-md font-sans mr-auto font-medium text-gray-700">
              Follow Us
            </h4>
            <div className="flex  items-center gap-3 text-white">
              <a
                href="https://www.facebook.com/"
                className="bg-[#126fe9] text-[18px] p-2 rounded-full"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/"
                className="bg-black text-[18px]  p-2 rounded-full"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.pinterest.com/"
                className="bg-[#e60023] text-[18px] p-2 rounded-full"
              >
                <FaPinterest />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="bg-[#0a66c2] text-[16px] p-[9px] rounded-full"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://web.whatsapp.com/"
                className="bg-[#25d366] text-[25px] p-1 rounded-full"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center leading-7">
            <h4 className="text-md font-sans font-medium text-gray-700">
              Call Us
            </h4>
            <p className="text-emerald-500 text-2xl font-bold">+6599887766</p>
          </div>

          <div className="hidden hover:opacity-80 duration-200 md:flex justify-center mb-1 mr-1 md:justify-end items-center">
            <Image
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688607%2Fsettings%2Fpayment-logo_qhslgz.webp&w=640&q=75"
              alt="Payment Methods"
              width={342}
              height={106}
              className="pl-3 xl:pl-0"
            />
          </div>
        </div>
      </div>

      <div className="border-gray-100 pt-4 pb-4.5">
        <p className="text-center text-sm text-gray-600">
          Copyright 2025 @
          <span className="text-emerald-500 font-normal pl-1">HtmlLover</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
