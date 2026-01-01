"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoBagHandleOutline, IoCloseOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "@/app/redux/cartSlice";
import { HiOutlineMinus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { getAuthUser } from "../../app/api/getProducts";


export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { items, totalItems, totalAmount } = useSelector((state) => state.cart);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getAuthUser();
      setUser(data);
    }

    fetchUser();
  }, []);


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:block fixed top-1/2 z-40 right-0 rounded-l-xl overflow-hidden"
      >
        <div className="bg-[#eef2ff] cursor-pointer gap-1 p-2 flex flex-col items-center text-sm w-[140px]">
          <IoBagHandleOutline className="text-emerald-600" size={24} />
          <span className="text-gray-700 font-medium font-sans">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>
        <div className="bg-[#007a55] cursor-pointer text-white text-center text-[16px] py-[9px] font-semibold">
          ${totalAmount.toFixed(2)}
        </div>
      </button>

      <button onClick={() => setIsOpen(true)}>
        <LuShoppingCart className="mr-1 sm:hidden" />
      </button>

      <button onClick={() => setIsOpen(true)}>
        <HiOutlineShoppingCart className="hidden sm:block mt-1.5 text-[24px] mx-2 cursor-pointer text-gray-200 hover:text-white" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full max-w-lg h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between bg-indigo-50 items-center p-4">
          <h2 className="flex text-lg gap-2 p-1 font-sans items-center text-black font-semibold">
            <FiShoppingCart className="text-2xl" />
            Shopping Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-[3px] text-gray-500 px-3 font-sans text-sm hover:text-red-700"
          >
            <IoCloseOutline className="text-lg font-medium" />
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-210px)] text-center px-6">
            <div className="mx-auto h-40 w-40 bg-cover">
              <Image
                src="https://kachabazar-store-nine.vercel.app/no-result.svg"
                alt="Empty Cart"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg mt-5 font-semibold text-black">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-sm font-sans mt-2 max-w-[80%]">
              No items added in your cart. Please add product to your cart list.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto h-[calc(100%-210px)]  px-4 py-8  lg:px-6  lg:py-10 ">
              {items.map((item, index) => {
                const key = item.name || item._id || item.id || index;
                const idKey = item.name;
                return (
                  <div
                    key={key}
                    className="flex items-center  mb-4  border-b border-gray-200 pb-4"
                  >
                    <div className="flex w-full items-center gap-4">
                      <Image
                        src={
                          item.image && item.image.trim() !== ""
                            ? item.image
                            : "/assets/placeholder_kvepfp.png"
                        }
                        alt={item.name || "Product image"}
                        width={80}
                        height={80}
                        className="rounded-md p-2 h-20 w-20 text-sm cursor-pointer bg-gray-100"
                      />

                      <div className="w-full pr-2.5">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm cursor-pointer text-gray-800 font-medium">
                              {item.name}
                            </h4>
                            <p className="text-gray-400 flex gap-1 text-xs mt-[5px]">
                              <span>Item Price</span>${item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => dispatch(deleteFromCart(idKey))}
                            className="hover:text-red-800 cursor-pointer text-red-500 text-[19px] flex"
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                        <div className="flex justify-between items-center ">
                          <p className="font-bold text-teal-600 hover:text-teal-700 text-sm  text-heading mt-1">
                            ${item.price}
                          </p>
                          <div className="flex items-center text-black mt-1 pr-1">
                            <button
                              onClick={() => dispatch(removeFromCart(idKey))}
                              className="border cursor-pointer border-gray-100 rounded-l-full border-r-0 px-2.5 md:px-3 py-2"
                            >
                              <HiOutlineMinus className="text-sm" />
                            </button>
                            <span className="border-y border-gray-100 text-sm py-[5px] sm:px-0.5">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                              className="border cursor-pointer border-gray-100 rounded-r-full border-l-0 px-2.5 md:px-3 py-2"
                            >
                              <HiPlus className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-5">
          <div className="flex text-[16px]  justify-between text-black font-medium font-sans">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-sm font-sans text-gray-600 mb-5 pr-10">
            Shipping and taxes calculated at checkout.
          </p>

          {user ? (
            <div className="flex gap-3 text-center text-sm sm:text-[16px]">
              <Link
                href="/checkout-cart"
                className="flex-1 border border-gray-200 bg-white text-gray-800 font-medium font-sans py-2 rounded-lg hover:bg-gray-100"
              >
                View Cart
              </Link>
              <Link
                href="/checkout-cart/checkout"
                className="flex-1 font-medium font-sans bg-emerald-500 text-white py-2 border border-emerald-500 rounded-lg hover:bg-emerald-700"
              >
                Checkout
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 text-center text-sm sm:text-[16px]">
              <Link
                href="/Auth/login"
                className="flex-1 border border-gray-200 bg-white text-gray-800 font-medium font-sans py-2 rounded-lg hover:bg-gray-100"
              >
                View Cart
              </Link>

              <Link
                href="/Auth/login"
                className="flex-1 font-medium font-sans bg-emerald-500 text-white py-2 border border-emerald-500 rounded-lg hover:bg-emerald-700"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
