"use client";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FiHome, FiUser } from "react-icons/fi";
import Sidebar from "../sidebar/page";
import ShoppingCart from "@/app/components/ShoppingCart";
import { useSelector } from "react-redux";

export default function Mobilebottomheader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className="fixed bottom-0 w-full h-16   px-3 bg-emerald-500 text-white text-2xl sm:hidden flex items-center justify-between shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
        <HiOutlineMenuAlt1
          className="h-6 w-6 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
        <Link href="/" className="flex items-center">
          <FiHome className="h-6 w-6 mr-2 cursor-pointer" />
        </Link>
        <div className="relative cursor-pointer">
          <ShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <Link href="/Auth/login">
          <FiUser className="h-6 w-6 cursor-pointer" />
        </Link>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
