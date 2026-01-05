'use client';

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MyReview() {
    const router = useRouter();
    const pathname = usePathname();

    const active = pathname.includes('/reviewedproducts') ? "reviewed" : "need";

    const handleNavigation = (tab) => {
        if (tab === "need") {
            router.push("/dashboard/my-review/needtoreview");
        } else if (tab === "reviewed") {
            router.push("/dashboard/my-review/reviewedproducts");
        }
    };

    useEffect(() => {
        if (pathname === "/dashboard/my-review") {
            router.push("/dashboard/my-review/needtoreview");
        }
    }, [pathname, router]);

    return (
        <div className="flex gap-8 pt-8 px-7 ">
            <button
                onClick={() => handleNavigation("need")}
                className={`pb-2 text-sm font-medium transition ${active === "need"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                Need to Review
            </button>

            <button
                onClick={() => handleNavigation("reviewed")}
                className={`pb-2 text-sm font-medium transition ${active === "reviewed"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                Reviewed Products
            </button>
        </div>
    );
};

