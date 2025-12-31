"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { getcategory } from "@/app/api/getProducts";
import Spinner from "@/components/ui/spinner";

const VISIBLE_CARDS = 7;

export default function FeaturedCategories() {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function fetchCategories() {
            const data = await getcategory();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    const next = () => {
        if (index < categories.length - VISIBLE_CARDS) {
            setIndex((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1);
        }
    };

    return (
        <section className="py-10  lg:py-11">
            <div className="max-w-[1456px] mx-auto">


                <div className="relative">
                    <button
                        onClick={next}

                        disabled={index === 0}
                        className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 text-white w-7 h-7 rounded-sm flex items-center justify-center disabled:opacity-40"
                    >
                        < MdOutlineKeyboardArrowRight size={15} />
                    </button>

                    {categories.length > 0 ? (
                        <div className="overflow-hidden">
                            <motion.div
                                animate={{ x: -index * 160 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="flex gap-2"
                            >
                                {categories.map((item, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[185px] bg-white rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-xs"
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={42}
                                            height={42}
                                            className="h-8 w-8 p-1 bg-gray-50  rounded-full  shadow-sm  shrink-0"
                                        />
                                        <h3 className="mt-3 text-xs font-medium font-sans text-gray-700">
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <Spinner />
                    )}

                    <button
                        onClick={prev}
                        disabled={index >= categories.length - VISIBLE_CARDS}
                        className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 text-white w-7 h-7 rounded-sm flex items-center justify-center disabled:opacity-40"
                    >
                        <MdOutlineKeyboardArrowLeft size={15} />
                    </button>
                </div>
            </div>
        </section>
    );
}
