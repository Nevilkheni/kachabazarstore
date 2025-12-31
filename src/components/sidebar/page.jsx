"use client";
import Link from "next/link";
import Image from "next/image";
// import categories from "@/app/data/categories.json";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoGiftOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { VscDash } from "react-icons/vsc";
import { BsQuestionCircle } from "react-icons/bs";
import { PiShieldCheckLight } from "react-icons/pi";
import { VscCallIncoming } from "react-icons/vsc";
import { LuUsers } from "react-icons/lu";
import {
  MdErrorOutline,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { getcategory } from "@/app/api/getProducts";

export default function MobileSidebar({ open, onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState("category");
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getcategory();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  if (!open) return null;

  const pages = [
    {
      name: "Offers",
      icon: <IoGiftOutline className="text-lg" />,
      href: "/couponssection",
    },
    {
      name: "Checkout",
      icon: <LuShoppingBag className="text-lg" />,
      href: "/checkout-cart/checkout",
    },
    {
      name: "FAQ",
      icon: <BsQuestionCircle className="text-lg" />,
      href: "/faq",
    },
    { name: "About Us", icon: <LuUsers className="text-lg" />, href: "/about" },
    {
      name: "Contact Us",
      icon: <VscCallIncoming className="text-lg" />,
      href: "/contact",
    },
    {
      name: "Privacy Policy",
      icon: <PiShieldCheckLight className="text-lg" />,
      href: "/Privacypolicy",
    },
    {
      name: "Forget Password",
      icon: <HiOutlineEmojiSad className="text-lg" />,
      href: "/Auth/login",
    },
    {
      name: "Terms and Conditions",
      icon: <CgFileDocument className="text-lg" />,
      href: "/Terms&Conditions",
    },
    {
      name: "Not Found",
      icon: <MdErrorOutline className="text-lg" />,
      href: "/404",
    },
  ];

  const toggleCategory = (title) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex sm:hidden">
      <div className="w-[320px] bg-white h-full flex flex-col shadow-lg">
        <div className="flex justify-between items-center px-4 py-5 ">
          <RxCross2
            onClick={onClose}
            className="text-2xl text-gray-400 cursor-pointer hover:text-gray-800"
          />
          <Link href="/">
            <Image
              src="https://kachabazar-store-nine.vercel.app/logo/logo-color.png"
              alt="Kacha Bazar"
              width={127}
              height={35}
              className="px-2 cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex border-b border-gray-200 text-[16px] font-sans font-medium text-gray-900">
          <button
            onClick={() => setActiveTab("category")}
            className={`w-1/2 py-3 pb-4 mx-4 border-b-2 ${activeTab === "category"
                ? "border-[#4f39f6] text-[#4f39f6]"
                : "border-transparent hover:text-[#4f39f6]"
              }`}
          >
            Category
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`w-1/2 py-3 pb-4 mx-4 border-b-2 ${activeTab === "pages"
                ? "border-[#4f39f6] text-[#4f39f6]"
                : "border-transparent hover:text-[#4f39f6]"
              }`}
          >
            Pages
          </button>
        </div>

        <div className="flex-1  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {activeTab === "category" ? (
            <div className="px-10 py-11">
              {categories.map((cat, index) => (
                <div key={index}>
                  <div
                    onClick={() => toggleCategory(cat.title)}
                    className="flex  items-center justify-between px-2 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Image
                        src={cat.icon}
                        alt={cat.title}
                        width={18}
                        height={18}
                        className="object-cover"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-800 hover:text-green-600">
                        {cat.title}
                      </span>
                    </div>
                    {openCategory === cat.title ? (
                      <MdOutlineKeyboardArrowDown className="text-gray-400  text-[20px]" />
                    ) : (
                      <MdOutlineKeyboardArrowRight className="text-gray-400  text-[20px]" />
                    )}
                  </div>

                  {openCategory === cat.title && cat.items && (
                    <div className="pl-5.5 py-1 pb-4 transition-all duration-300 ease-in-out">
                      {cat.items.map((sub, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            onSelect?.(sub.title || sub);
                            onClose?.();
                          }}
                          className="py-1 text-sm text-gray-700 hover:text-green-600 cursor-pointer flex items-center gap-2"
                        >
                          <VscDash /> {sub.title || sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className=" p-6 space-y-6">
              {pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  onClick={() => {
                    onSelect?.(page.name);
                    onClose?.();
                  }}
                  className="flex items-center gap-2 hover:bg-gray-50 cursor-pointer rounded-md p-1 transition-all"
                >
                  {page.icon}
                  <span className="text-sm font-medium text-gray-800 hover:text-green-600">
                    {page.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
