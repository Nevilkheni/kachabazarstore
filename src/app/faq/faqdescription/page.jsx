"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

export default function DescriptionFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: "How does the KachaBazar work?",
      a: `Yes. You can cancel your subscription anytime. Your subscription will continue to be active until the end of your current term (month or year) but it will not auto-renew. Unless you delete your account manually, your account and all data will be deleted 60 days from the day your subscription becomes inactive.    `,
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Short answer: yes. More details can go here.",
    },
    {
      q: "Whice payment method you should accept?",
      a: "List the payment methods that you accept.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Auto-scaling description.",
    },
    {
      q: "What is KachaBazar EC2 auto scaling?",
      a: "Affiliate benefits.",
    },
    {
      q: "What are the benefits of using KachaBazar affliate?",
      a: "Product configuration details.",
    },
    {
      q: "What is a affliates product configuration?",
      a: "Product configuration details.",
    },
    {
      q: "What is fleet management and how is it different from dynamic scaling?",
      a: "Product configuration details.",
    },
  ];

  return (
    <div className="bg-white py-10 sm:py-12 px-3 sm:px-10 xl:px-6 ">
      <div className="grid gap-4  max-w-[1456px] mx-auto lg:mb-8 items-center md:grid-cols-2 xl:grid-cols-2">
        <div className="pr-16">
          <Image
            src="https://res.cloudinary.com/ahossain/image/upload/v1697687955/settings/faq_qr1y1h.svg"
            alt="illustration"
            width={720}
            height={550}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="  leading-6 sm:leading-7 lg:leading-6 divide-y pt-8  divide-gray-900/10">
          <div>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <FAQRow
                  key={i}
                  index={i}
                  open={openIndex === i + 1}
                  onToggle={() =>
                    setOpenIndex(openIndex === i + 1 ? -1 : i + 1)
                  }
                  q={f.q}
                  a={f.a}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQRow({ q, a, open, onToggle }) {
  return (
    <div className="border-b last:border-none ">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between pt-8.5 pb-0.5 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-md font-medium text-gray-800">{q}</span>
        <div className="w-5 h-5 text-gray-900">
          {open ? <FaMinus /> : <FaPlus />}
        </div>
      </button>
      <div
        className={`px-0 pb-5 pr-5 transition-all duration-200 ${
          open ? "block" : "hidden"
        }`}
      >
        <p className="text-md leading-7 text-gray-700">{a}</p>
      </div>
    </div>
  );
}
