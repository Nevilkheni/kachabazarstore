'use client';

import Image from 'next/image';
import { useState } from 'react';

const NeedToReviewPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const productsNeedingReview = [
        {
            id: 1,
            name: "Organic Pinkerton Avocado",
            image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Fresh Pineapple",
            image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Organic Bananas",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Canada Salmon",
            image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Dan Cake Layer Cake",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Fresh Flour",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 7,
            name: "Aarong Dairy Ghee",
            image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 8,
            name: "Cat Toy Set",
            image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 9,
            name: "Fresh Chinigura Rice",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 10,
            name: "Ahold Acorn Squash",
            image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 11,
            name: "French Green Beans",
            image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 12,
            name: "ACI Pure Sugar",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 13,
            name: "Window Squeegee",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 14,
            name: "Organic Kale",
            image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=200&h=200&fit=crop&crop=center"
        },
        {
            id: 15,
            name: "Dan Cake Lemon",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop&crop=center"
        }
    ];

    const itemsPerPage = 16;
    const totalPages = Math.ceil(productsNeedingReview.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = productsNeedingReview.slice(startIndex, endIndex);

    const handleWriteReview = (productId) => {
        console.log('Writing review for product:', productId);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="px-6 py-3 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {currentProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg p-2  border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="  shrink-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    height={200}
                                    width={200}
                                    className="object-cover w-16 h-16 p-2 rounded"
                                />
                            </div>
                            <div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                        {product.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => handleWriteReview(product.id)}
                                    className="flex mt-2 min-w-min px-2 py-1 text-xs font-semibold bg-emerald-500 text-white rounded hover:bg-emerald-600"
                                >
                                    Write Review
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    SHOWING 1-16 OF 112
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

                    {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded text-sm font-medium transition-colors duration-200 ${currentPage === page
                                ? 'bg-green-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

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
        </div>
    );
};

export default NeedToReviewPage;