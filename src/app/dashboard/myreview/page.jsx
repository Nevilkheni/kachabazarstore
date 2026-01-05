"use client";
import { useState } from "react";
import NeedtoReview from "./needtoreview/page";
import ReviewedProducts from "./reviewedproducts/page";


export default function ReviewedProductsTabs() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="w-full pt-7.5 px-6 mx-auto text-black">
            <div className="flex gap-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("tab1")}
                    className={`whitespace-nowrap pb-2 px-1 text-sm font-medium transition-all
            ${activeTab === "tab1"
                            ? "border-b-2 border-green-500 text-green-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Need to Review
                </button>

                <button
                    onClick={() => setActiveTab("tab2")}
                    className={`whitespace-nowrap pb-2 px-1 text-sm font-medium transition-all
            ${activeTab === "tab2"
                            ? "border-b-2 border-green-500 text-green-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Reviewed Products
                </button>
            </div>

            <div className="mt-4">
                {activeTab === "tab1" && <NeedtoReview />}
                {activeTab === "tab2" && <ReviewedProducts />}
            </div>
        </div>
    );
}
