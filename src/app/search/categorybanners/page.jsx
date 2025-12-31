"use client";

import Image from "next/image";

export default function CategoryBanners() {
    return (
        <div className="w-full px-6 md:px-14 lg:px-16 xl:px-10">
            <div className="max-w-[1456px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="relative h-[220px] w-full rounded-xl overflow-hidden bg-[#00838f]">
                    <div className="absolute inset-0 p-6 flex flex-col justify-center z-10">
                        <p className="text-white text-sm">Taste of</p>
                        <h2 className="text-white text-2xl font-bold mt-1">
                            Fresh & Natural
                        </h2>
                        <p className="text-white text-sm mt-1">
                            Weekend discount offer
                        </p>
                        <button className="mt-4 w-fit bg-green-500 text-white text-sm px-5 py-2 rounded-full">
                            Shop Now
                        </button>
                    </div>

                    <Image
                        src="https://kachabazar-store-nine.vercel.app/_next/image?url=%2Fcta%2Fcta-bg-1.jpg&w=1200&q=75"
                        alt="Fresh & Natural"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative h-[220px] rounded-xl overflow-hidden bg-[#ff8a80]">
                    <div className="absolute inset-0 p-6 flex flex-col justify-center z-10">
                        <p className="text-white text-sm">Taste of</p>
                        <h2 className="text-white text-2xl font-bold mt-1">
                            Fish & Meat
                        </h2>
                        <p className="text-white text-sm mt-1">
                            Weekend discount offer
                        </p>
                        <button className="mt-4 w-fit bg-green-500 text-white text-sm px-5 py-2 rounded-full">
                            Shop Now
                        </button>
                    </div>

                    <Image
                        src="https://kachabazar-store-nine.vercel.app/_next/image?url=%2Fcta%2Fcta-bg-2.jpg&w=1200&q=75"
                        alt="Fish & Meat"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="relative h-[220px] rounded-xl overflow-hidden bg-[#19a974]">
                    <div className="absolute inset-0 p-6 flex flex-col justify-center z-10">
                        <p className="text-white text-sm">Taste of</p>
                        <h2 className="text-white text-2xl font-bold mt-1">
                            Bread & Bakery
                        </h2>
                        <p className="text-white text-sm mt-1">
                            Weekend discount offer
                        </p>
                        <button className="mt-4 w-fit bg-green-500 text-white text-sm px-5 py-2 rounded-full">
                            Shop Now
                        </button>
                    </div>

                    <Image
                        src="https://kachabazar-store-nine.vercel.app/_next/image?url=%2Fcta%2Fcta-bg-3.jpg&w=1200&q=75"
                        alt="Bread & Bakery"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </div>
    );
}
