"use client";
import { useState, useRef, useEffect } from "react";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = [
    { code: "TR", name: "Türke" },
    { code: "GB", name: "English" },
    { code: "BD", name: "Spanish" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center hover:text-emerald-600 mt-1 font-sans text-sm font-medium appearance-none text-black"
      >
        <span className="text-[10px] mr-1 font-sans">GB</span> English
      </button>

      {open && (
        <div className="absolute right-1 w-[150px] mt-2  bg-white border border-gray-100 rounded-lg shadow-md z-50">
          {languages.map((lang, index) => (
            <button
              key={index}
              onClick={() => {
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
            >
              <span className="text-[10px] mr-1 font-sans">{lang.code}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
