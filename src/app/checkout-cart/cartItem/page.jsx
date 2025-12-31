"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "@/app/redux/cartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className=" text-gray-800">
        <h2 className="text-xl  font-sans font-bold  pb-3 border-b border-gray-200">
          Shopping Cart
        </h2>
        <Image
          src="https://kachabazar-store-nine.vercel.app/no-result.svg"
          alt="empty-cart"
          width={100}
          height={100}
          className="mx-auto shrink-0 h-52 w-52"
        />
        <p className="text-lg text-center font-sans font-bold">
          Your cart is empty
        </p>
        <p className="text-[14px] text-center font-sans text-gray-400">
          No items added in your cart. Please add product to your cart list.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl  font-sans font-bold  pb-3 border-b border-gray-200">
        Shopping Cart
      </h2>

      {items.map((item, index) => {
        const idKey = item.name;

        return (
          <div
            key={index}
            className={`flex gap-4 items-center  justify-between py-4 border-gray-200 ${
              index === 0 ? " pt-7" : "border-t"
            }`}
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image || "/assets/placeholder_kvepfp.png"}
                alt={item.name}
                width={70}
                height={70}
                className="rounded cursor-pointer  h-20 w-20 shrink-0 bg-gray-100 p-2"
              />
            </div>
            <div className="w-full">
              <div className="items-center gap-4 flex justify-between w-full">
                <div className="space-y-1">
                  <p className="font-medium text-sm font-sans">{item.name}</p>
                  <p className=" text-[12px] font-sans text-gray-400">
                    Item Price ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => dispatch(deleteFromCart(idKey))}
                  className="text-red-500 cursor-pointer text-lg mb-auto "
                >
                  <AiOutlineDelete />
                </button>
              </div>

              <div className="items-center gap-4 mt-px flex justify-between w-full">
                <p className="text-sm sm:text-[16px] text-emerald-600 font-bold font-sans ">
                  {item.price}
                </p>
                <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 bg-white">
                  <button onClick={() => dispatch(removeFromCart(idKey))}>
                    <HiOutlineMinus className="text-[15px] cursor-pointer mx-0.5" />
                  </button>

                  <span className="mx-3 text-[15px]">{item.quantity}</span>

                  <button onClick={() => dispatch(addToCart({...item, quantity: 1}))}>
                    <HiPlus className="text-[15px] cursor-pointer mx-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
