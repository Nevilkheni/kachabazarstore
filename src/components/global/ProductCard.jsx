"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoBagAdd } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/app/redux/cartSlice";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [hovered, setHovered] = useState(false);

    const cartItem = cartItems.find((i) => i.name === product.name);
    const quantity = cartItem ? cartItem.quantity : 0;
    const isInCart = quantity > 0;

    const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");
    const slug = slugify(product.name);

    const cleanPrice = typeof product.price === 'string'
        ? product.price.replace('$', '')
        : product.price;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative bg-white rounded-xl border border-gray-100 hover:border-emerald-400 overflow-hidden shadow-[rgba(0,0,0,0.09)_0px_3px_12px] transition-all duration-150"
        >
            {product.discount && (
                <span className="absolute top-3 right-3 border border-rose-200 text-rose-500 font-semibold text-[12px] px-2 py-0.5 rounded-full z-10">
                    {product.discount}
                </span>
            )}

            <div className="relative flex justify-center bg-gray-100 transition-all">
                <Link href={`/product/${slug}`}>
                    <Image
                        src={
                            product.image && product.image.trim() !== ""
                                ? product.image
                                : "/assets/placeholder_kvepfp.png"
                        }
                        alt={product.name || "Product image"}
                        width={192}
                        height={192}
                        className={`object-cover p-2 xl:p-0 lg:my-2 cursor-pointer duration-300 transform ${hovered ? "scale-105" : "scale-100"
                            }`}
                    />
                </Link>

                <button
                    onClick={() => dispatch(addToCart(product))}
                    className="absolute bottom-3 right-3 bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-200 border-2 hover:border-emerald-600 border-gray-200"
                >
                    <IoBagAdd className="text-[20px]" />
                </button>

                {isInCart && (
                    <div className="absolute bottom-2.5 right-2.5 border-2 border-gray-50 bg-emerald-500 text-white flex flex-col items-center rounded-full overflow-hidden">
                        <button
                            onClick={() => {
                                if (quantity === 1) {
                                    dispatch(removeFromCart(product.name));
                                } else {
                                    dispatch(removeFromCart(product.name));
                                }
                            }}
                            className="px-3.5 py-1.5 w-full"
                        >
                            <HiOutlineMinus className="text-md" />
                        </button>

                        <span className="px-3.5 py-1.5 text-sm font-medium w-full text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="px-3.5 py-1.5 w-full"
                        >
                            <HiPlus className="text-[16px] text-gray-200 mx-auto" />
                        </button>
                    </div>
                )}
            </div>

            <div className="px-4 pb-1 py-2">
                <Link href={`/product/${slug}`}>
                    <h4 className="text-sm font-medium text-gray-700 truncate hover:text-emerald-600 cursor-pointer">
                        {product.name}
                    </h4>
                </Link>

                <div className="flex items-center mt-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star, i) =>
                        i < Math.round(product.rating || 0) ? (
                            <AiFillStar key={i} className="text-xs" />
                        ) : (
                            <AiOutlineStar key={i} className="text-xs" />
                        )
                    )}
                    <p className="text-gray-400 text-xs ml-2 font-sans">
                        <span className="font-medium font-sans">
                            {product.rating || 0}
                        </span>{" "}
                        ( {product.reviews || 0} reviews )
                    </p>
                </div>

                <div className="mt-2 mb-1">
                    <div className="flex justify-between">
                        <p className="text-gray-600 text-xs font-bold font-sans">
                            ${cleanPrice}
                        </p>
                        {product.oldPrice && (
                            <p className="text-gray-400 text-xs font-medium font-sans line-through">
                                ${product.oldPrice}
                            </p>
                        )}
                    </div>
                    <Image
                        src="https://i.ibb.co.com/GQQy11TV/display-price-line.webp"
                        alt="Price Line"
                        width={192}
                        height={192}
                        className="object-cover mx-auto mt-1"
                    />
                    <p className="text-black font-bold text-md text-center py-1.5 font-sans">
                        ${cleanPrice}
                    </p>
                </div>
            </div>
        </div>
    );
}