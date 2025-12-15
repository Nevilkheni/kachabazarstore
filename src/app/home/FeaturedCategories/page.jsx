"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { getcategory } from "@/app/api/getProducts";
import Spinner from "@/components/ui/spinner";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getcategory();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <section className="bg-[#f3f4f6] py-10 lg:py-16">
      <div className="max-w-[1535px] mx-auto px-3 sm:px-10">
        <div className="text-center mb-10">
          <h2 className="text-xl lg:text-[24px] font-semibold text-gray-900">
            Featured Categories
          </h2>
          <p className="text-gray-500 mt-2 lg:mt-1.5 text-[16px] w-full lg:w-1/3 mx-auto font-sans">
            Choose your necessary products from this feature categories.
          </p>
        </div>

        <div className="grid cursor-pointer grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 rounded-lg overflow-hidden">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <div
                key={index}
                className="border-b border-r border-gray-200 hover:shadow-md transition duration-150 bg-white p-4 flex items-start justify-start text-left"
              >
                <div className="my-auto">
                  <Image
                    src={cat.icon}
                    alt={cat.title}
                    width={35}
                    height={35}
                    className="cursor-pointer"
                  />
                </div>
                <div className="my-auto pl-4">
                  <h3 className="text-gray-600 cursor-pointer line-clamp-1 hover:text-orange-400 text-sm font-medium font-sans mb-2">
                    {cat.title}
                  </h3>

                  <ul className="text-gray-500 text-[14px] space-y-0.5">
                    {cat.items?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center hover:translate-x-2 transition-transform duration-300 hover:text-gray-700 cursor-pointer"
                      >
                        <MdOutlineKeyboardArrowRight className="text-xs my-auto" />
                        <span className="text-[12px] text-gray-400">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-20">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
