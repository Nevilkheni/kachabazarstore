'use client';

import Image from 'next/image';
import { useState } from 'react';

const ReviewedProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const reviewedProducts = [
    {
      id: 1,
      name: "Organic Avocado",
      image: "/assets/placeholder_kvepfp.png",
      rating: 5,
      reviewDate: "2024-01-15",
      review: "Great quality and fresh taste!"
    },
    {
      id: 2,
      name: "Fresh Salmon",
      image: "/assets/placeholder_kvepfp.png",
      rating: 4,
      reviewDate: "2024-01-10",
      review: "Good quality fish, will buy again."
    },
    {
      id: 3,
      name: "Organic Milk",
      image: "/assets/placeholder_kvepfp.png",
      rating: 5,
      reviewDate: "2024-01-08",
      review: "Pure and fresh milk, excellent quality."
    },
    {
      id: 4,
      name: "Whole Wheat Bread",
      image: "/assets/placeholder_kvepfp.png",
      rating: 4,
      reviewDate: "2024-01-05",
      review: "Healthy and tasty bread option."
    },
    {
      id: 5,
      name: "Greek Yogurt",
      image: "/assets/placeholder_kvepfp.png",
      rating: 5,
      reviewDate: "2024-01-03",
      review: "Creamy texture and great taste!"
    },
    {
      id: 6,
      name: "Organic Honey",
      image: "/assets/placeholder_kvepfp.png",
      rating: 5,
      reviewDate: "2024-01-01",
      review: "Pure honey with amazing flavor."
    }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(reviewedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = reviewedProducts.slice(startIndex, endIndex);

  const handleEditReview = (productId) => {
    console.log('Editing review for product:', productId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <div className="w-16 h-16 relative shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.reviewDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.review}
                </p>
                <button
                  onClick={() => handleEditReview(product.id)}
                  className="text-green-600 hover:text-green-700 text-xs font-medium transition-colors duration-200"
                >
                  Edit Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            SHOWING {startIndex + 1}-{Math.min(endIndex, reviewedProducts.length)} OF {reviewedProducts.length}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewedProductsPage;