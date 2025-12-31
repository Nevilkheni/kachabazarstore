"use client";
import Link from "next/link";
import Image from "next/image";
import Mobilebottomheader from "./mobilebottomheader";
import PagesDropdown from "./PagesDropdown/page";
import CategoryDropdown from "./CategoryDropdown/page";
import ShoppingCart from "../global/ShoppingCart";
import LanguageDropdown from "./languagedropdown/page";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineBell } from "react-icons/hi2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useSelector } from "react-redux";
import { LuLockOpen } from "react-icons/lu";
import { PiSquaresFour } from "react-icons/pi";
import { IoReorderThreeSharp } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import { FiShield } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { handleLogout } from "../global/logout";
import { setUser as setReduxUser } from "@/app/redux/userSlice";

export default function Mainheader() {
  const [openCategory, setOpenCategory] = useState(false);
  const { totalItems } = useSelector((state) => state.cart);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const categoryRef = useRef(null);
  const userMenuRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/user`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res) => {
        if (!res.ok) return null;

        const text = await res.text();
        if (!text) return null;

        return JSON.parse(text);
      })
      .then((data) => {
        if (data) {
          dispatch(setReduxUser(data));
        }
      })
      .catch((err) => console.log("err:", err));
  }, [user, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [openPages, setOpenPages] = useState(false);
  const pagesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pagesRef.current &&
        !pagesRef.current.contains(e.target) &&
        categoryRef.current &&
        !categoryRef.current.contains(e.target)
      ) {
        setOpenPages(false);
        setOpenCategory(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="w-full fixed z-50 bg-white  text-sm text-gray-700 flex flex-col items-center">
      <div className="w-full hidden lg:block  bg-gray-100 text-gray-700 ">
        <div className="max-w-[1456px] mx-auto flex justify-between items-center pt-2 pb-[7px] px-10 2xl:px-0">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <FiPhoneCall className="text-xs mb-px" />
              <p className="text-[12px] ml-1 font-sans font-medium">
                We are available 24/7, Need help??
              </p>
            </div>
            <span className="text-[#0abe82] cursor-pointer font-bold  font-sans text-[12px]">
              +099949343
            </span>
          </div>

          <div className="flex items-center text-[12px] font-sans font-medium">
            <Link href="/about" className="hover:text-emerald-600">
              About Us
            </Link>
            <span className="mx-2">|</span>
            <Link href="/contact" className="hover:text-emerald-600">
              Contact Us
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/dashboard/my-account"
              className="hover:text-emerald-600"
            >
              My Account
            </Link>
            <span className="mx-2">|</span>
            {user ? (
              <button
                onClick={() => handleLogout(dispatch)}
                className="hover:text-emerald-600 flex items-center gap-1"
              >
                <LuLockOpen className="text-[12px] mb-0.5  cursor-pointer" />{" "}
                Logout
              </button>
            ) : (
              <Link
                href="/Auth/login"
                className="hover:text-emerald-600 flex items-center gap-1"
              >
                <FiUser className="text-[12px] mb-0.5 " /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-[#00bc7d]">
        <div className="max-w-[1456px] mx-auto flex  items-center h-20  px-2 sm:px-10 2xl:px-0">
          <div className="h-full hidden sm:block mx-2 lg:mx-0 min-w-[111px] max-w-[111px]  items-center">
            <Link href="/">
              <Image
                src="/assets/logo-light.svg"
                alt="logo"
                height={111}
                width={32}
                className="cursor-pointer w-full h-full "
              />
            </Link>
          </div>

          <div className="w-full  sm:mr-1 px-7 sm:px-6 md:px-14 lg:px-16 xl:px-10">
            <div className="flex  items-center pt-3 sm:pt-[11px] bg-white rounded-lg  pb-2 sm:pb-[9px]  mb-2 justify-between  ">
              <input
                type="text"
                placeholder="Search for products (e.g. shirt, pant)"
                className="flex  pl-5  w-full text-sm  font-sans outline-none text-gray-900 placeholder:text-gray-500"
              />
              <FiSearch className=" text-gray-400 mr-4 sm:mr-5  text-xl sm:text-[19px] " />
            </div>
          </div>

          <div className="hidden sm:flex items-center shrink-0  text-[22px]">
            <div className="relative">
              <ShoppingCart className="text-[24px]  text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            <HiOutlineBell className="text-gray-200 hover:text-white cursor-pointer h-6 w-6 mx-4" />
            <div className="mx-3 lg:mx-5  w-px h-6 bg-white"></div>
            <div ref={userMenuRef} className="relative">
              {user ? (
                <div>
                  <Image
                    src={user.avatar || "/public/assets/placeholder_kvepfp.png"}
                    alt="pfp"
                    height={1}
                    width={1}
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="text-white cursor-pointer h-8 w-8 rounded-full ml-5"
                  />
                  {openUserMenu && (
                    <div className="absolute text-sm  right-0 mt-3 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4  py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <PiSquaresFour className="text-gray-700 text-lg " />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/my-orders"
                        className="flex items-center gap-2 px-4  py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <IoReorderThreeSharp className="text-gray-700 text-lg" />
                        My order
                      </Link>
                      <Link
                        href="/dashboard/update-profile"
                        className="flex items-center gap-2 px-4  py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <TbSettings className="text-gray-700 text-lg" />
                        Update Profile
                      </Link>
                      <Link
                        href="/dashboard/change-password"
                        className="flex items-center gap-2 px-4  py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <FiShield className="text-gray-700 text-lg" />
                        Change password
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/Auth/login">
                  <FiUser className="text-white cursor-pointer text-[24px] ml-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full hidden lg:block bg-white border-t border-gray-200 border-b">
        <div className="max-w-[1456px] mx-auto flex justify-between items-center h-[47px] text-sm px-10 2xl:px-0">
          <div className="flex items-center text-black font-medium font-sans text-sm gap-8">
            <div
              ref={categoryRef}
              className="relative flex items-center mb-0.5 cursor-pointer"
              onClick={() => setOpenCategory((prev) => !prev)}
            >
              <span className="hover:text-green-600 ">Categories</span>
              <MdOutlineKeyboardArrowDown className="m-1 text-xs" />
              <CategoryDropdown open={openCategory} />
            </div>
            <div className="flex mx-1">
              <Link
                href="/about"
                className="px-4 hover:text-green-600 cursor-pointer"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 hover:text-green-600 cursor-pointer"
              >
                Contact Us
              </Link>

              <div
                ref={pagesRef}
                onClick={() => setOpenPages((prev) => !prev)}
                className="relative  flex items-center cursor-pointer"
              >
                <span className="hover:text-green-600 mb-0.5">Pages</span>
                <MdOutlineKeyboardArrowDown className="m-1 text-[13px]" />
                <PagesDropdown open={openPages} />
              </div>
            </div>

            <Link href="/couponssection" className="relative   mx-4">
              <span className="bg-red-100 hover:text-emerald-600 text-red-500 text-sm  font-sans px-2 rounded-sm">
                Offers
              </span>
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </Link>
          </div>

          <div className="flex items-center  text-black font-medium font-sans text-sm px-4">
            <LanguageDropdown />
            <Link href="/Privacypolicy" className="hover:text-emerald-600 pl-7">
              Privacy Policy
            </Link>
            <Link
              href="Terms&Conditions"
              className="hover:text-emerald-600 pl-8"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <Mobilebottomheader />
    </header>
  );
}
