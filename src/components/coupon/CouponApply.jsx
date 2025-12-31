"use client";
import { useState, useEffect } from "react";
import { showToast } from "@/components/global/toast";
import { useCouponContext } from "@/contexts/CouponContext";

export default function CouponApply({
    totalAmount,
    className = "",
}) {
    const [coupon, setCoupon] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    const {
        appliedCoupon,
        applyCoupon,
        validateCouponForAmount
    } = useCouponContext();

    useEffect(() => {
        if (appliedCoupon) {
            setCoupon("");
        }
    }, [appliedCoupon]);

    useEffect(() => {
        const handleCouponApplied = () => {
            setCoupon("");
        };

        const handleCouponRemoved = () => {
            setCoupon("");
        };

        window.addEventListener('couponApplied', handleCouponApplied);
        window.addEventListener('couponRemoved', handleCouponRemoved);

        return () => {
            window.removeEventListener('couponApplied', handleCouponApplied);
            window.removeEventListener('couponRemoved', handleCouponRemoved);
        };
    }, []);

    useEffect(() => {
        if (appliedCoupon && totalAmount > 0) {
            validateCouponForAmount(totalAmount);
        }
    }, [totalAmount, appliedCoupon, validateCouponForAmount]);

    const validateCouponInput = (code) => {
        if (!code || typeof code !== 'string') {
            return { isValid: false, message: "Please enter a coupon code" };
        }

        const trimmedCode = code.trim();
        if (trimmedCode.length === 0) {
            return { isValid: false, message: "Please enter a valid coupon code" };
        }

        if (trimmedCode.length < 3) {
            return { isValid: false, message: "Coupon code must be at least 3 characters" };
        }

        if (trimmedCode.length > 20) {
            return { isValid: false, message: "Coupon code cannot exceed 20 characters" };
        }

        const validCodePattern = /^[A-Za-z0-9\-_]+$/;
        if (!validCodePattern.test(trimmedCode)) {
            return { isValid: false, message: "Coupon code contains invalid characters" };
        }

        return { isValid: true, code: trimmedCode.toUpperCase() };
    };

    const validateOrderAmount = (amount) => {
        if (!amount || amount <= 0) {
            return { isValid: false, message: "Please add items to cart before applying coupon" };
        }
        return { isValid: true };
    };

    const handleApply = async () => {
        if (isValidating) return;

        const codeValidation = validateCouponInput(coupon);
        if (!codeValidation.isValid) {
            showToast({
                type: "error",
                title: "Invalid Input",
                message: codeValidation.message,
            });
            return;
        }

        const amountValidation = validateOrderAmount(totalAmount);
        if (!amountValidation.isValid) {
            showToast({
                type: "error",
                title: "Invalid Cart",
                message: amountValidation.message,
            });
            return;
        }

        if (appliedCoupon && appliedCoupon.code === codeValidation.code) {
            showToast({
                type: "info",
                title: "Already Applied",
                message: "This coupon is already applied to your order",
            });
            return;
        }

        setIsValidating(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: codeValidation.code,
                        orderAmount: totalAmount,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            if (!data.success) {
                throw new Error(data.message || "Coupon validation failed");
            }

            const { coupon: validCoupon, discountAmount } = data.data;

            if (!validCoupon || !validCoupon.code) {
                throw new Error("Invalid coupon data received from server");
            }

            if (discountAmount < 0) {
                throw new Error("Invalid discount amount");
            }

            applyCoupon(validCoupon, discountAmount);

            showToast({
                type: "success",
                title: "Coupon Applied!",
                message: `You saved $${discountAmount.toFixed(2)} with code ${validCoupon.code}`,
                duration: 4000,
            });

        } catch (error) {
            console.error("Coupon validation error:", error);

            let errorMessage = "Failed to validate coupon. Please try again.";

            if (error.message.includes("expired")) {
                errorMessage = "This coupon has expired";
            } else if (error.message.includes("minimum")) {
                errorMessage = error.message;
            } else if (error.message.includes("Invalid") || error.message.includes("inactive")) {
                errorMessage = "Invalid or inactive coupon code";
            } else if (error.message.includes("network") || error.message.includes("fetch")) {
                errorMessage = "Network error. Please check your connection and try again.";
            }

            showToast({
                type: "error",
                title: "Coupon Error",
                message: errorMessage,
            });
        } finally {
            setIsValidating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleApply();
        }
    };

    return (
        <div className={className}>
            {!appliedCoupon ? (
                <div className="flex gap-1">
                    <input
                        onChange={(e) => setCoupon(e.target.value)}
                        value={coupon}
                        type="text"
                        placeholder="Enter coupon code"
                        maxLength={20}
                        onKeyDown={handleKeyDown}
                        disabled={isValidating}
                        className="w-full border rounded-lg px-4 py-2.5 font-medium bg-gray-100 text-sm focus:outline-none focus:ring-1 border-gray-100 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={handleApply}
                        disabled={isValidating || !coupon.trim()}
                        className="shrink-0 text-white px-4 py-2.5 rounded-lg text-sm font-medium bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isValidating ? "Applying..." : "Apply"}
                    </button>
                </div>
            ) : (
                <div className="py-3 px-4 bg-green-50 border-none rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="text-sm flex w-full text-green-700 justify-between items-center">
                            <div>
                                <p className="font-semibold">Coupon Applied</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-red-600 font-medium font-sans">
                                    {appliedCoupon.code}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}