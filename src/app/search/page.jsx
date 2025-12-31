"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/global/ProductCard";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchProducts = useCallback(async (searchQuery) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/search?query=${encodeURIComponent(searchQuery)}`
            );

            if (!response.ok) {
                throw new Error("Failed to search products");
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (query) {
            searchProducts(query);
        }
    }, [query, searchProducts]);

    if (loading) {
        return (
            <div className="h-auto py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Error</h1>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Link href="/" className="text-emerald-600 hover:text-emerald-700">
                            Go back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-[1456px] mx-auto py-1 text-black bg-[#ffedd4] px-4 rounded-md flex items-center justify-between">
                <div className="flex w-full justify-between items-center gap-2 mx-aut bg-orange-100 border border-gray-100 rounded">
                    <p className="text-sm text-gray-700 font-sans font-medium">Total 2 Items Found</p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-700">Sort By Price</p>
                        <select
                            className="text-sm border bg-white border-gray-300 rounded-md px-3 my-2 outline-none cursor-pointer"
                            defaultValue="low"
                        >
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className=" py-3 px-4">
                <div className="max-w-[1456px] mx-auto">
                    {products.length === 0 ? (
                        <div className=" p-6">
                            <Image
                                src={"https://kachabazar-store-nine.vercel.app/no-result.svg"}
                                width={100}
                                height={100}
                                alt="No results found"
                                className="mx-auto shrink-0 w-100 h-68"
                            />
                            <div className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium text-gray-600">
                                <p>Sorry, we can not find this product 😞</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}