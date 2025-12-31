"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { showToast } from "@/components/global/toast";

const COUPON_STORAGE_KEY = 'applied_coupon';

export function useCoupon(totalAmount) {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const previousTotalAmount = useRef(totalAmount);
  const isCheckingValidity = useRef(false);

  useEffect(() => {
    const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (savedCoupon) {
      try {
        const couponData = JSON.parse(savedCoupon);
        setAppliedCoupon(couponData.coupon);
        setCouponDiscount(couponData.discount);
      } catch (error) {
        console.error('Error loading saved coupon:', error);
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const checkCouponValidity = async () => {
      if (!appliedCoupon || totalAmount <= 0 || isCheckingValidity.current) return;

      if (totalAmount === previousTotalAmount.current) return;

      isCheckingValidity.current = true;

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
            setAppliedCoupon(null);
            setCouponDiscount(0);
            localStorage.removeItem(COUPON_STORAGE_KEY);

            showToast({
              type: "warning",
              title: "Coupon Removed",
              message: data.data.reason || "Coupon is no longer valid for current cart total",
              duration: 4000,
            });
          } else {
            const newDiscount = data.data.discountAmount;
            setCouponDiscount(newDiscount);

            localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({
              coupon: appliedCoupon,
              discount: newDiscount
            }));
          }
        }
      } catch (error) {
        console.error("Error checking coupon validity:", error);
        setAppliedCoupon(null);
        setCouponDiscount(0);
        localStorage.removeItem(COUPON_STORAGE_KEY);
      } finally {
        isCheckingValidity.current = false;
        previousTotalAmount.current = totalAmount;
      }
    };

    checkCouponValidity();
  }, [totalAmount, appliedCoupon]);

  const applyCoupon = useCallback((coupon, discount) => {
    setAppliedCoupon(coupon);
    setCouponDiscount(discount);

    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify({
      coupon,
      discount
    }));
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, []);

  const clearCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, []);

  return {
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    clearCoupon
  };
}