"use client";
import { useState, useRef, useEffect } from "react";
import { BsDash } from "react-icons/bs";
import Image from "next/image";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { getcategory } from "@/app/api/getProducts";

export default function CategoryDropdown({ open, onClose, toggleRef }) {
  const [categories, setCategories] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const dropdownRef = useRef(null);

  const handleToggle = (index, e) => {
    e.stopPropagation();
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getcategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      const dropdownEl = dropdownRef.current;
      const toggleEl = toggleRef?.current;

      if (dropdownEl && dropdownEl.contains(event.target)) return;
      if (toggleEl && toggleEl.contains(event.target)) return;

      onClose?.();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, toggleRef]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full w-[315px] bg-white h-[600px] shadow-lg rounded-lg px-5 pb-10 py-8 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {categories.map((cat, index) => (
        <div key={index}>
          <div
            onClick={(e) => handleToggle(index, e)}
            className="flex items-center justify-between px-2 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center">
              <Image
                src={cat.icon}
                alt={cat.title}
                width={18}
                height={18}
                className="object-cover h-4.5 w-4.5"
              />
              <span className="text-sm ml-3 font-medium text-black hover:text-green-600">
                {cat.title}
              </span>
            </div>

            {activeIndexes.includes(index) ? (
              <MdOutlineKeyboardArrowDown className="text-gray-400 text-[20px] mr-3" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-gray-400 text-[20px] mr-3" />
            )}
          </div>

          {activeIndexes.includes(index) && cat.items && (
            <ul className="pl-5 space-y-2 m-2">
              {cat.items.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-500 hover:text-green-600 cursor-pointer flex justify-start font-normal font-sans items-center gap-1"
                >
                  <BsDash className="text-xs" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
