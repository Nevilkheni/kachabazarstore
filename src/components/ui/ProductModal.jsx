"use client";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { LuHeadphones, LuShoppingBag } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductModal({ product, onClose }) {
  const [count, setCount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");
  const slug = slugify(product.name);

  const handleImageClick = () => {
    router.push(`/product/${slug}`);
    onClose();
  };

  return (
    <div className="fixed text-black inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/50"></div>

      <div className="bg-white h-[90vh] lg:h-auto overflow-y-auto scrollbar-hide mx-4 lg:mx-auto max-w-[960px] rounded-2xl p-5 lg:p-8 w-auto text-center relative z-50">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-11 xl:gap-16">
          <div
            onClick={handleImageClick}
            className="w-auto h-auto cursor-pointer  transition-opacity"
          >
            <Image
              src={
                product.image && product.image.trim() !== ""
                  ? product.image
                  : "/assets/placeholder_kvepfp.png"
              }
              alt={product.name || "Product image"}
              width={400}
              height={400}
              className="object-cover h-full w-[420px] lg:w-[360px] shrink-0 rounded-lg"
            />
          </div>

          <div className="w-full lg:w-[60%] text-left my-auto">
            <p className="text-xs text-emerald-600">
              <span className="text-gray-400 text-xs mr-1">In stock:</span>
              {product.stock ?? "Available"}
            </p>

            <h1
              className="text-lg sm:text-xl my-0.5 font-semibold text-gray-800 cursor-pointer"
              onClick={handleImageClick}
            >
              {product.name}
            </h1>

            <div className="flex py-0.5 items-center">
              {[1, 2, 3, 4, 5].map((_, i) =>
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

            <p className="text-sm py-2 leading-6 text-gray-500">
              {product.description}
            </p>

            <div className="flex items-center my-2 sm:my-2.5 gap-2">
              <p className="text-xl font-bold font-sans text-gray-900">
                ${product.price}
              </p>
              {product.oldPrice && (
                <p className="text-gray-400 text-sm line-through">
                  ${product.oldPrice}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 py-4 sm:py-3">
              <div className="w-full flex justify-between text-black">
                <button
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  className="border border-gray-300 rounded-l-md py-2.5 px-3 sm:px-4 hover:bg-gray-100"
                >
                  <HiOutlineMinus />
                </button>

                <span className="flex justify-center items-center px-6 text-md border-y w-full text-center border-gray-300 font-medium">
                  {count}
                </span>

                <button
                  onClick={() => setCount(count + 1)}
                  className="border border-gray-300 rounded-r-md py-2.5 px-3 sm:px-4 hover:bg-gray-100"
                >
                  <HiPlus />
                </button>
              </div>

              <button className="flex w-full gap-2 py-2 sm:py-2.5 justify-center items-center bg-emerald-500 text-white font-medium font-sans text-sm rounded-lg hover:bg-emerald-600">
                <LuShoppingBag className="text-sm" />
                Add to cart
              </button>

              <Link
                href={`/product/${slug}`}
                onClick={onClose}
                className="flex w-full gap-2 py-2 sm:py-2.5 justify-center items-center bg-gray-100 text-gray-600 font-medium font-sans text-sm rounded-lg hover:bg-gray-200"
              >
                <FiEye className="text-sm" />
                View details
              </Link>
            </div>

            <p className="mt-2 flex gap-3 text-sm font-medium text-gray-800">
              Category
              <span className="text-gray-700 cursor-pointer font-medium">
                {product.category ?? "General"}
              </span>
            </p>

            {product.subcategory && Array.isArray(product.subcategory) ? (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {product.subcategory.map((sub, i) => (
                  <span
                    key={i}
                    className="text-xs cursor-pointer font-sans px-2 py-1 bg-gray-100 text-gray-500 rounded-md"
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

            <p className="flex border-t border-gray-200 mt-3 items-center gap-1 text-sm pt-5 text-gray-500">
              <LuHeadphones />
              Call Us for Order{" "}
              <span className="cursor-pointer font-sans font-bold text-emerald-500">
                +099949340
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 top-2 px-2.5 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
