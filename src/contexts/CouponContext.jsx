"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { showToast } from "@/components/global/toast";

const CouponContext = createContext();
const COUPON_STORAGE_KEY = 'applied_coupon';

const getInitialCouponState = () => {
    if (typeof window === 'undefined') return { coupon: null, discount: 0 };

    try {
        const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
        if (savedCoupon) {
            const couponData = JSON.parse(savedCoupon);
            return { coupon: couponData.coupon, discount: couponData.discount };
        }
    } catch (error) {
        console.error('Error loading saved coupon:', error);
        localStorage.removeItem(COUPON_STORAGE_KEY);
    }

    return { coupon: null, discount: 0 };
};

export function CouponProvider({ children }) {
    const initialState = getInitialCouponState();
    const [appliedCoupon, setAppliedCoupon] = useState(initialState.coupon);
    const [couponDiscount, setCouponDiscount] = useState(initialState.discount);

    const applyCoupon = useCallback((coupon, discount) => {
        setAppliedCoupon(coupon);
        setCouponDiscount(discount);

        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({
            coupon,
            discount
        }));

        window.dispatchEvent(new CustomEvent('couponApplied', {
            detail: { coupon, discount }
        }));
    }, []);

    const removeCoupon = useCallback(() => {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        localStorage.removeItem(COUPON_STORAGE_KEY);

        window.dispatchEvent(new CustomEvent('couponRemoved'));
    }, []);

    const clearCoupon = useCallback(() => {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        localStorage.removeItem(COUPON_STORAGE_KEY);
    }, []);

    const validateCouponForAmount = useCallback(async (totalAmount) => {
        if (!appliedCoupon || totalAmount <= 0) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/check-validity`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: appliedCoupon.code,
                        orderAmount: totalAmount,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                if (!data.data.isValid) {
                    removeCoupon();
                    showToast({
                        type: "warning",
                        title: "Coupon Removed",
                        message: data.data.reason || "Coupon is no longer valid for current cart total",
                        duration: 4000,
                    });
                } else {
                    const newDiscount = data.data.discountAmount;
                    if (newDiscount !== couponDiscount) {
                        setCouponDiscount(newDiscount);
                        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({
                            coupon: appliedCoupon,
                            discount: newDiscount
                        }));
                    }
                }
            }
        } catch (error) {
            console.error("Error validating coupon:", error);
        }
    }, [appliedCoupon, couponDiscount, removeCoupon]);

    const value = {
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        clearCoupon,
        validateCouponForAmount
    };

    return (
        <CouponContext.Provider value={value}>
            {children}
        </CouponContext.Provider>
    );
}

export function useCouponContext() {
    const context = useContext(CouponContext);
    if (!context) {
        throw new Error('useCouponContext must be used within a CouponProvider');
    }
    return context;
}