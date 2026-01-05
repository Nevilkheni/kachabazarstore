"use client";
import { useEffect, useState } from "react";
import { showToast } from "@/components/global/toast";
import { FaArrowRight } from "react-icons/fa6";
import {
    convertUSDToINR,
    getExchangeRate,
    refreshExchangeRate,
} from "@/utils/currencyConverter";

export default function CashfreeCheckout({
    amount,
    onProcessingChange,
    onSuccess,
    orderData,
    onValidateAndCreateOrder,
}) {
    const [inrAmount, setInrAmount] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [isConverting, setIsConverting] = useState(true);
    const [cashfreeSDK, setCashfreeSDK] = useState(null);

    useEffect(() => {
        const initializeCashfreeSDK = () => {
            const script = document.createElement("script");
            script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
            script.async = true;

            script.onload = () => {
                if (window.Cashfree) {
                    const cashfree = window.Cashfree({
                        mode: process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT === "PRODUCTION" ? "production" : "sandbox",
                    });
                    setCashfreeSDK(cashfree);
                    console.log("Cashfree SDK initialized successfully");
                } else {
                    console.error("Cashfree SDK failed to load");
                }
            };

            script.onerror = () => {
                console.error("Failed to load Cashfree SDK");
                showToast({
                    type: "error",
                    title: "SDK Error",
                    message: "Failed to load Cashfree payment SDK",
                });
            };

            document.body.appendChild(script);
        };

        initializeCashfreeSDK();

        const convertCurrency = async () => {
            try {
                setIsConverting(true);
                const rate = await getExchangeRate();
                const convertedAmount = await convertUSDToINR(amount);
                setExchangeRate(rate);
                setInrAmount(convertedAmount);
                setIsConverting(false);
            } catch (conversionError) {
                console.error("Currency conversion failed:", conversionError);
                setExchangeRate(83);
                setInrAmount(parseFloat(amount) * 83);
                setIsConverting(false);
            }
        };

        convertCurrency();

        return () => {
            const scripts = document.querySelectorAll('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
            scripts.forEach(script => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            });
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
        } catch {
            showToast({
                type: "error",
                title: "Update Failed",
                message: "Could not fetch latest rate",
            });
        }
        setIsConverting(false);
    };

    const handleCashfreePayment = async () => {
        if (isConverting || !inrAmount) {
            showToast({
                type: "info",
                title: "Please Wait",
                message: "Converting currency...",
            });
            return;
        }

        if (!cashfreeSDK) {
            showToast({
                type: "error",
                title: "Payment Error",
                message: "Cashfree SDK not loaded. Please try again.",
            });
            return;
        }

        onProcessingChange(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cashfree/create-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        amount: Math.round(inrAmount * 100), // Convert to paise
                        orderData: orderData,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || "Failed to create payment session");
            }

            const sessionData = await response.json();
            console.log("Payment session created:", sessionData);

            const checkoutOptions = {
                paymentSessionId: sessionData.payment_session_id,
                redirectTarget: "_modal", // Opens in popup modal
            };

            console.log("Opening Cashfree checkout with options:", checkoutOptions);

            const result = await cashfreeSDK.checkout(checkoutOptions);

            console.log("Cashfree checkout result:", result);

            if (result.error) {
                console.error("Payment failed:", result.error);

                showToast({
                    type: "error",
                    title: "Payment Failed",
                    message: result.error.message || "Payment failed. Please try again.",
                });
                onProcessingChange(false);
                return;
            }

            if (result.paymentDetails) {
                console.log("Payment completed:", result.paymentDetails);

                const verificationResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/cashfree/verify-payment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            orderId: sessionData.order_id,
                        }),
                    }
                );

                const verificationData = await verificationResponse.json();
                console.log("Payment verification result:", verificationData);

                if (verificationData.success && verificationData.order_status === 'PAID') {
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
                                message: "Payment successful but order creation failed. Please contact support.",
                            });
                        }
                    } catch (authError) {
                        console.error("Order creation error:", authError);
                        showToast({
                            type: "error",
                            title: "Order Creation Failed",
                            message: authError.message || "Payment successful but order creation failed. Please contact support.",
                        });
                    }
                } else if (verificationData.order_status === 'PENDING') {
                    showToast({
                        type: "warning",
                        title: "Payment Pending",
                        message: "Your payment is being processed. You will be notified once completed.",
                    });
                } else {
                    showToast({
                        type: "error",
                        title: "Payment Verification Failed",
                        message: verificationData.message || "Payment could not be verified.",
                    });
                }
            }

        } catch (error) {
            console.error("Cashfree payment error:", error);
            showToast({
                type: "error",
                title: "Payment Error",
                message: error.message || "Failed to initiate payment. Please try again.",
            });
        }

        onProcessingChange(false);
    };

    return (
        <div className="w-full h-10 space-y-2">
            <button
                onClick={handleCashfreePayment}
                disabled={isConverting || !cashfreeSDK}
                className={`w-full gap-2 text-sm font-medium font-sans flex justify-center py-2.5 rounded-md transition-colors ${isConverting || !cashfreeSDK
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 opacity-50 hover:bg-teal-600"
                    } text-white`}
            >
                {isConverting ? "Converting..." : !cashfreeSDK ? "Loading SDK..." : "Confirm Order"} <FaArrowRight />
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