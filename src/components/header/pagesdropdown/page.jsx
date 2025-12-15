"use client";
import { IoGiftOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { VscCallIncoming } from "react-icons/vsc";
import { LuFolderLock } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import Link from "next/link";

export default function PagesDropdown({ open }) {
  if (!open) return null;

  return (
    <div className="absolute top-full py-9 px-3 left-0 w-[315px] bg-white shadow-lg rounded-md overflow-hidden z-50">
      <ul className="flex flex-col  gap-2 text-sm font-sans font-medium text-gray-900">
        <Link
          href="/couponssection"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <IoGiftOutline className="font-medium text-xl " />
          Offers
        </Link>
        <Link
          href="/Auth/login"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <LuShoppingBag className="font-medium text-xl " />
          Checkout
        </Link>
        <Link
          href="/faq"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <BsQuestionCircle className="font-medium text-xl " />
          FAQ
        </Link>
        <Link
          href="/about"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <FiUser className="font-medium text-xl " />
          About Us
        </Link>
        <Link
          href="/contact"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <VscCallIncoming className="font-medium text-xl " />
          Contact Us
        </Link>
        <Link
          href="/Privacypolicy"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <LuFolderLock className="font-medium text-xl " />
          Privacy Policy
        </Link>
        <Link
          href="/Terms&Conditions"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <IoDocumentOutline className="font-medium text-xl " />
          Terms & Conditions
        </Link>
        <Link
          href="404"
          className="hover:bg-gray-100 hover:text-green-500 text-sm font-medium font-sans gap-2  px-4 py-2 cursor-pointer flex items-center"
        >
          <MdErrorOutline className="font-medium text-xl " />
          404
        </Link>
      </ul>
    </div>
  );
}
