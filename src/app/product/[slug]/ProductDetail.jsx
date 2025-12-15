"use client";
import Image from "next/image";
import Link from "next/link";
import { LuHeadphones } from "react-icons/lu";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiFacebookCircleFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import RelatedProducts from "@/app/home/relatedproducts.jsx/page";
import ReviewDescription from "../reviewdescription/page";

export default function ProductDetail({ product }) {
  const [count, setCount] = useState(1);

  if (!product)
    return (
      <div className="p-10 text-center text-gray-600">Product not found</div>
    );
  const productId = 1;
  return (
    <section className="w-full px-3 sm:px-6 md:px-10 py-6 lg:py-8">
      <div className="max-w-[1456px] mx-auto">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link
            href="/"
            className="hover:text-emerald-500 duration-100 font-medium font-sans text-black"
          >
            Home
          </Link>
          <MdOutlineKeyboardArrowRight className="text-lg mx-0.5" />
          <span className="hover:text-emerald-500 duration-100 font-medium font-sans text-black">
            {product.category}
          </span>
          <MdOutlineKeyboardArrowRight className="text-lg " />
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="lg:grid grid-cols-1 md:grid-cols-7   gap-x-4 gap-y-6">
          <div className="md:col-span-3 mb-auto lg:max-h-[615px] bg-gray-100 2xl:flex justify-center items-center rounded-xl  my-2">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg w-full h-auto"
            />
          </div>

          <div className="md:col-span-4 w-full   xl:px-14.5 2xl:px-21.5 flex flex-col py-5.5 lg:py-1.5 ">
            <p className="text-xs text-emerald-600  ">
              <span className="text-gray-400 text-xs">In stock:</span>{" "}
              {product.stock ?? "Available"}
            </p>

            <h1 className="text-lg sm:text-xl lg:text-2xl my-1 lg:my-0.5 font-semibold text-gray-800 ">
              {product.name}
            </h1>

            <div className="flex  items-center">
              {[1, 2, 3, 4, 5].map((star, i) =>
                i < Math.round(product.rating) ? (
                  <AiFillStar key={i} className="text-yellow-400 text-xs" />
                ) : (
                  <AiOutlineStar key={i} className="text-gray-300 text-xs" />
                )
              )}
              <span className="text-gray-400 text-xs ml-2">
                {product.rating} ( {product.reviews} reviews )
              </span>
            </div>

            <div className="flex items-center my-2 sm:my-2.5 gap-2">
              <p className="text-xl  font-bold font-sans text-gray-900">
                ${product.price}
              </p>
              {product.oldPrice && (
                <p className="text-gray-400 text-sm line-through">
                  ${product.oldPrice}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-5.5">
              <div className="w-full flex justify-between  text-black">
                <button
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  className="border border-gray-300 rounded-l-md py-[9px] px-3 sm:px-4 hover:bg-gray-100"
                >
                  <HiOutlineMinus />
                </button>
                <span className="text-md border-y p-[9px] w-full text-center border-gray-300 font-medium">
                  {count}
                </span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="border border-gray-300 rounded-r-md py-[9px] px-3 sm:px-4 hover:bg-gray-100"
                >
                  <HiPlus />
                </button>
              </div>
              <button className="w-full bg-[#00bba7] text-white py-3 font-medium font-sans text-sm rounded-lg hover:bg-[#00978a]">
                Add to Cart
              </button>
            </div>

            <p className="mt-4.5 flex gap-3 text-sm font-medium font-sans  text-gray-800">
              Category:
              <span className="text-gray-700 font-medium">
                {product.category ?? "General"}
              </span>
            </p>
            {product.subcategory && Array.isArray(product.subcategory) ? (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {product.subcategory.map((sub, i) => (
                  <span
                    key={i}
                    className="text-xs font-sans px-2 py-1 bg-gray-100 text-gray-500  rounded-md"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs font-sans px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                {product.subcategory ?? "No"}
              </span>
            )}
            <p className="flex items-center gap-1 text-sm py-2.5 text-gray-500">
              <LuHeadphones />
              Call Us for Order{" "}
              <span className=" font-sans font-bold text-emerald-500">
                +099949343
              </span>
            </p>
            <span className="w-full h-px bg-gray-200 my-3.5"></span>

            {product.highlights && (
              <div className="mt-3">
                <h3 className="font-medium font-sans text-sm text-gray-800 mb-2">
                  Highlights
                </h3>
                <ul className="text-gray-500 space-y-4 py-4  text-sm">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {h.icon.includes(".svg") ? (
                        <Image
                          src={h.icon.replace("/public", "")}
                          alt="icon"
                          width={18}
                          height={18}
                          className="mt-px opacity-40 shrink-0"
                        />
                      ) : (
                        ""
                      )}
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <span className="w-full h-px bg-gray-200 my-4"></span>
            <div className="my-2">
              <h3 className="font-medium font-sans text-sm text-gray-800">
                Share your social network
              </h3>
              <p className="text-gray-500 text-sm font-sans">
                For get lots of traffic from social network share this product
              </p>
              <div className="flex items-center gap-6  pt-4 sm:py-4 text-gray-400">
                <RiFacebookCircleFill className="text-2xl " />
                <IoLogoInstagram className="text-[26px]" />
                <RiTwitterXFill className="text-[23px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewDescription productId={productId} />
      <RelatedProducts category={product.category} />
    </section>
  );
}
