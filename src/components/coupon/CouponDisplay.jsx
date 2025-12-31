"use client";
import { useCouponContext } from "@/contexts/CouponContext";

export default function CouponDisplay({ className = "" }) {
    const { appliedCoupon, couponDiscount } = useCouponContext();

    if (!appliedCoupon) return null;

    return (
        <div className={`py-2 px-3 bg-green-50 border border-green-200 rounded-lg ${className}`}>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-green-700 font-medium">Coupon Applied:</span>
                    <span className="text-green-800 font-semibold">{appliedCoupon.code}</span>
                </div>
                <span className="text-green-600 font-medium">
                    -${couponDiscount.toFixed(2)}
                </span>
            </div>
        </div>
    );
}