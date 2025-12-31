"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { getCoupons } from "../api/getProducts";
import { showToast } from "@/components/global/toast";

function CountdownTimer({ expiryDate, onExpiry }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isExpired) {
          setIsExpired(true);
          if (onExpiry) {
            onExpiry();
          }
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate, isExpired, onExpiry]);

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1 text-lg font-bold text-gray-800 mb-2">
      <span className="bg-gray-100 px-2 py-1 rounded text-sm">
        {formatTime(timeLeft.days)}
      </span>
      <span className="text-gray-400">:</span>
      <span className="bg-gray-100 px-2 py-1 rounded text-sm">
        {formatTime(timeLeft.hours)}
      </span>
      <span className="text-gray-400">:</span>
      <span className="bg-gray-100 px-2 py-1 rounded text-sm">
        {formatTime(timeLeft.minutes)}
      </span>
      <span className="text-gray-400">:</span>
      <span className="bg-gray-100 px-2 py-1 rounded text-sm">
        {formatTime(timeLeft.seconds)}
      </span>
    </div>
  );
}

export default function CouponsSection() {
  const [coupons, setCoupons] = useState([]);
  const [expiredCoupons, setExpiredCoupons] = useState(new Set());
  const [copiedCoupons, setCopiedCoupons] = useState(new Set());

  const defaultExpiryDate = useMemo(() => {
    const now = new Date();
    return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }, []);

  useEffect(() => {
    getCoupons().then(setCoupons);
  }, []);

  const handleCouponExpiry = (couponId) => {
    setExpiredCoupons((prev) => new Set([...prev, couponId]));
  };

  const isCouponExpired = (couponId, expiryDate) => {
    if (expiredCoupons.has(couponId)) return true;

    const now = new Date().getTime();
    const expiry = new Date(expiryDate || defaultExpiryDate).getTime();
    return expiry <= now;
  };

  const isCouponActive = (coupon) => {
    return coupon.status === "Active" && !isCouponExpired(coupon._id, coupon.expiryDate);
  };

  const handleCopyCode = async (code, couponId) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedCoupons((prev) => new Set([...prev, couponId]));

      showToast({
        type: "success",
        title: "Copied!",
        message: `Coupon code "${code}" copied to clipboard`,
        duration: 2000,
      });

    } catch (err) {
      console.error('Failed to copy: ', err);
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedCoupons((prev) => new Set([...prev, couponId]));

      showToast({
        type: "success",
        title: "Copied!",
        message: `Coupon code "${code}" copied to clipboard`,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <div
          className="flex justify-center items-center py-10 lg:py-20 w-full bg-cover bg-no-repeat bg-bottom"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/ahossain/image/upload/v1697439245/settings/yw3cd2xupqwqpqcbxv9l.jpg")',
          }}
        >
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-black text-center">
            Mega Offer
          </h1>
        </div>
      </div>
      <div className="w-full px-4 md:px-10 bg-[#f9fafb] py-10 lg:py-20">
        <div className="max-w-[1456px] mx-auto">
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="coupon block  md:flex lg:flex md:justify-between lg:justify-between items-center bg-white rounded-md shadow-sm"
              >
                <div className="tengah p-6 gap-6 flex items-center justify-items-start">
                  <div className="w-[120px] sm:h-[120px] overflow-hidden rounded-lg sm:shrink-0">
                    <Image
                      src={coupon.image || "/assets/placeholder_kvepfp.png"}
                      alt={coupon.title}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <CountdownTimer
                      className="flex items-center justify-center bg-red-100 text-sm  font-semibold px-2 py-1 rounded mx-1"
                      expiryDate={coupon.expiryDate || defaultExpiryDate}
                      onExpiry={() => handleCouponExpiry(coupon._id)}
                    />

                    <h3 className=" text-lg font-sans text-black leading-6 font-medium mb-3">
                      {coupon.title}
                    </h3>

                    <p className="text-lg md:text-xl lg:text-xl text-red-500 font-bold">
                      {coupon.discountPercent}%
                      <span className="text-gray-600 font-medium text-base ml-1">
                        Off
                      </span>
                    </p>
                  </div>
                </div>

                <div className="hidden  h-full md:flex flex-col justify-between  bg-white ml-auto  -mr-4  ">
                  <div className=" w-7 h-7 -mt-3 bg-[#f9fafb] rounded-full"></div>
                  <div className=" w-7 h-7 -mb-3 bg-[#f9fafb] rounded-full"></div>
                </div>

                <div className="flex flex-col justify-center mb-4  md:my-4.5 lg:my-5.5 md:border-l-2 lg:border-l-2 border-dashed lg:w-1/3 md:w-1/3 relative px-6">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium text-md">
                      Coupon
                    </span>
                    <span
                      className={`font-semibold text-sm px-2  rounded ${!isCouponActive(coupon)
                        ? "text-red-500"
                        : "text-green-600"
                        }`}
                    >
                      {!isCouponActive(coupon)
                        ? "Inactive"
                        : "Active"}
                    </span>
                  </div>

                  <div className=" cursor-pointer border border-dashed bg-emerald-50 py-2 border-emerald-300 my-1 rounded-xl text-center block">
                    <button
                      onClick={() => {
                        if (!isCouponActive(coupon)) {
                          showToast({
                            type: "error",
                            title: "Expired",
                            message: "This coupon has expired or is inactive",
                            duration: 2000,
                          });
                          return;
                        }
                        handleCopyCode(coupon.code, coupon._id);
                      }}
                      disabled={!isCouponActive(coupon)}
                      className={`font-sans font-semibold cursor-pointer text-sm sm:text-xs py-1 sm:py-2 tracking-wider rounded transition-colors duration-200 w-full ${!isCouponActive(coupon)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-teal-600 "
                        }`}
                    >
                      {copiedCoupons.has(coupon._id) ? "Copied!" : coupon.code}
                    </button>
                  </div>

                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    * This coupon code will apply on
                    <br />
                    when you shopping more than{" "}
                    <span className="font-bold text-gray-700">
                      ${coupon.minPurchase}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
