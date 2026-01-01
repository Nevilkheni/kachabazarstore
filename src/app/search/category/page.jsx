"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { getcategory } from "@/app/api/getProducts";
import Spinner from "@/components/ui/spinner";

const VISIBLE_CARDS_DESKTOP = 7;
// const VISIBLE_CARDS_MOBILE = 1;

export default function FeaturedCategories() {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);

    const extendedCategories = useMemo(() => {
        if (categories.length === 0) return [];
        const duplicateCount = isMobile ? 2 : VISIBLE_CARDS_DESKTOP;
        return [...categories, ...categories.slice(0, duplicateCount)];
    }, [categories, isMobile]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            const data = await getcategory();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length === 0) return;

        const startAutoScroll = () => {
            intervalRef.current = setInterval(() => {
                setIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex >= categories.length) {
                        setTimeout(() => {
                            setIsTransitioning(false);
                            setIndex(0);
                        }, 350);
                        setIsTransitioning(true);
                        return nextIndex;
                    }

                    return nextIndex;
                });
            }, 1000);
        };

        startAutoScroll();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [categories.length]);

    const pauseAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resumeAutoScroll = () => {
        if (categories.length === 0) return;

        intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= categories.length) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setIndex(0);
                    }, 350);
                    setIsTransitioning(true);
                    return nextIndex;
                }

                return nextIndex;
            });
        }, 1000);
    };

    const next = () => {
        const nextIndex = index + 1;

        if (nextIndex >= categories.length) {
            setIndex(nextIndex);
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(0);
            }, 350);
            setIsTransitioning(true);
        } else {
            setIndex(nextIndex);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(categories.length - 1);
        }
    };

    return (
        <section className="py-10 lg:py-11">
            <div className="max-w-[1456px] mx-auto px-4">
                <div
                    className="relative"
                    onMouseEnter={pauseAutoScroll}
                    onMouseLeave={resumeAutoScroll}
                >
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 text-white w-7 h-7 rounded-sm  items-center justify-center hover:bg-emerald-600 transition-colors hidden md:flex"
                    >
                        <MdOutlineKeyboardArrowLeft size={15} />
                    </button>

                    {categories.length > 0 ? (
                        <div className="overflow-hidden">
                            <motion.div
                                animate={{
                                    x: isMobile ? -index * (300 + 8) : -index * 160
                                }}
                                transition={{
                                    duration: isTransitioning ? 0 : 0.35,
                                    ease: "easeInOut"
                                }}
                                className="flex gap-2"
                                style={{
                                    paddingLeft: isMobile ? 'calc(50% - 150px)' : '0'
                                }}
                            >
                                {extendedCategories.map((item, i) => (
                                    <div
                                        key={`${item.title}-${i}`}
                                        className="min-w-[300px] md:min-w-[185px] bg-white rounded-lg p-3 flex flex-col items-center text-center shadow-xs shrink-0"
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={42}
                                            height={42}
                                            className="h-8 w-8 p-1 bg-gray-50 rounded-full shadow-sm"
                                        />
                                        <h3 className="mt-3 text-xs font-medium text-gray-700">
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
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-500 text-white w-7 h-7 rounded-sm  items-center justify-center hover:bg-emerald-600 transition-colors hidden md:flex"
                    >
                        <MdOutlineKeyboardArrowRight size={15} />
                    </button>
                </div>
            </div>
        </section>
    );
}