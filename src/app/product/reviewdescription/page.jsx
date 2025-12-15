"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getPopularProducts, getreviewsData } from "@/app/api/getProducts";
import Spinner from "@/components/ui/spinner";
export default function ReviewDescription({ productId }) {
  const [activeTab, setActiveTab] = useState("reviews");
  const [products, setProducts] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getPopularProducts();
      setProducts(data);
    };

    const loadReviews = async () => {
      const data = await getreviewsData();
      setReviewsData(data);
    };

    loadProducts();
    loadReviews();
  }, []);

  const product = products.find((p) => p.id === productId);
  const productReviews =
    reviewsData.find((r) => r.productId === productId)?.reviews || [];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <AiFillStar key={i} className="text-yellow-500" />
      ) : (
        <AiOutlineStar key={i} className="text-yellow-500" />
      )
    );
  };

  return (
    <div className="w-full lg:px-10">
      <div className="max-w-[1456px] mx-auto mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 sm:pb-2 py-2 sm:px-4 text-sm font-semibold ${
              activeTab === "reviews"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            Customer Reviews
          </button>
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 sm:pb-2 py-2 px-8 sm:px-4 text-sm font-semibold ${
              activeTab === "description"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            Description
          </button>
        </div>

        {activeTab === "reviews" && (
          <div className="mt-6">
            <div className="h-[400px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  productReviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        {rev.avatar ? (
                          <Image
                            src={rev.avatar}
                            alt={rev.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
                            {rev.name.charAt(0)}
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">
                              {rev.name}
                            </h3>
                            <p className="text-sm text-gray-500">{rev.date}</p>
                          </div>

                          <div className="flex items-center mt-1">
                            {renderStars(rev.rating)}
                          </div>

                          {rev.comment && (
                            <p className="text-gray-700 text-sm mt-2">
                              {rev.comment}
                            </p>
                          )}

                          {rev.images?.length > 0 && (
                            <div className="flex gap-3 mt-3 flex-wrap">
                              {rev.images.map((img, i) => (
                                <div
                                  key={i}
                                  className="w-16 h-16 border border-gray-200 rounded-lg p-1"
                                >
                                  <Image
                                    src={img}
                                    alt="product"
                                    width={60}
                                    height={60}
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "description" && (
          <div className="mt-6  overflow-y-auto pr-3 text-gray-700 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {product ? (
              <p>{product.description}</p>
            ) : (
              <p className="text-gray-500 italic">
                No description available for this product.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
