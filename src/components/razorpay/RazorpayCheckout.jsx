"use client";
import { useEffect, useState } from "react";
import { showToast } from "@/components/global/toast";
import { FaArrowRight } from "react-icons/fa6";
import {
  convertUSDToINR,
  getExchangeRate,
  refreshExchangeRate,
} from "@/utils/currencyConverter";

export default function RazorpayCheckout({
  amount,
  onProcessingChange,
  onSuccess,
  orderData,
  onValidateAndCreateOrder,
}) {
  const [inrAmount, setInrAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isConverting, setIsConverting] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const convertCurrency = async () => {
      try {
        setIsConverting(true);
        const rate = await getExchangeRate();
        const convertedAmount = await convertUSDToINR(amount);
        setExchangeRate(rate);
        setInrAmount(convertedAmount);
        setIsConverting(false);
      } catch (error) {
        console.error("Currency conversion failed:", error);
        setExchangeRate(83);
        setInrAmount(parseFloat(amount) * 83);
        setIsConverting(false);
      }
    };

    convertCurrency();

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount]);

  const handleRefreshRate = async () => {
    setIsConverting(true);
    try {
      const rate = await refreshExchangeRate();
      const convertedAmount = await convertUSDToINR(amount);
      setExchangeRate(rate);
      setInrAmount(convertedAmount);
      showToast({
        type: "success",
        title: "Rate Updated",
        message: `New rate: 1 USD = ₹${rate.toFixed(2)}`,
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Update Failed",
        message: "Could not fetch latest rate",
      });
    }
    setIsConverting(false);
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      showToast({
        type: "error",
        title: "Payment Error",
        message: "Razorpay SDK not loaded. Please try again.",
      });
      return;
    }

    if (isConverting || !inrAmount) {
      showToast({
        type: "info",
        title: "Please Wait",
        message: "Converting currency...",
      });
      return;
    }

    onProcessingChange(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(inrAmount * 100),
      currency: "INR",
      name: "Kabchazar",
      description: "Order Payment",
      image: "https://kachabazar-preview.netlify.app/assets/img/favicon.png",
      handler: async function (response) {
        console.log("Payment successful:", response);
        showToast({
          type: "success",
          title: "Payment Successful",
          message: "Your payment has been processed successfully!",
        });

        try {
          const authCheck = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!authCheck.ok) {
            throw new Error("Authentication failed. Please login again.");
          }

          const orderCreated = await onValidateAndCreateOrder();
          if (orderCreated) {
            onSuccess();
          } else {
            showToast({
              type: "error",
              title: "Order Creation Failed",
              message:
                "Payment successful but order creation failed. Please contact support.",
            });
          }
        } catch (error) {
          console.error("Order creation error:", error);
          showToast({
            type: "error",
            title: "Order Creation Failed",
            message:
              error.message ||
              "Payment successful but order creation failed. Please contact support.",
          });
        }
        onProcessingChange(false);
      },
      prefill: {
        name: orderData?.name || "",
        email: orderData?.email || "",
        contact: orderData?.phone || "",
      },
      notes: {
        address: orderData?.address || "",
      },
      theme: {
        color: "#14b8a6",
      },
      modal: {
        ondismiss: function () {
          onProcessingChange(false);
          showToast({
            type: "info",
            title: "Payment Cancelled",
            message: "Payment was cancelled by user.",
          });
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      onProcessingChange(false);
      console.error("Payment failed:", response.error);
      showToast({
        type: "error",
        title: "Payment Failed",
        message:
          response.error.description || "Payment failed. Please try again.",
      });
    });

    rzp.open();
  };

  return (
    <div className="w-full h-10 space-y-2">
      <button
        onClick={handleRazorpayPayment}
        disabled={isConverting}
        className={`w-full gap-2 text-sm font-medium font-sans flex justify-center py-2.5 rounded-md transition-colors ${
          isConverting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-500 opacity-50 hover:bg-teal-600"
        } text-white`}
      >
        Confirm Order <FaArrowRight />
      </button>
      {exchangeRate && !isConverting && (
        <div className="flex justify-between items-center text-xs text-gray-500 px-2">
          <span>Rate: 1 USD = ₹{exchangeRate.toFixed(2)}</span>
          <button
            onClick={handleRefreshRate}
            className="text-teal-600 hover:text-teal-700 underline"
            disabled={isConverting}
          >
            Refresh Rate
          </button>
        </div>
      )}
    </div>
  );
}
