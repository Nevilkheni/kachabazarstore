"use client";
import { showToast } from "@/components/global/toast";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalCheckout({
  amount,
  onSuccess,
  onProcessingChange,
  fundingSource = "paypal",
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const setProcessingState = (value) => {
    setIsProcessing(value);
    if (onProcessingChange) {
      onProcessingChange(value);
    }
  };

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return (
    <PayPalButtons
      fundingSource={fundingSource}
      style={{
        layout: "vertical",
        color: fundingSource === "card" ? "black" : "gold",
        ...(fundingSource !== "card" && { label: "paypal" }),
        tagline: false,
        height: 40,
      }}
      disabled={isProcessing}
      createOrder={async () => {
        try {
          setProcessingState(true);

          const res = await fetch(`${API_BASE_URL}/api/paypal/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
          });

          if (!res.ok) {
            let errorData;
            try {
              errorData = await res.json();
            } catch {
              const rawText = await res.text().catch(() => "N/A");
              errorData = {
                error: `Server error: ${res.status} ${res.statusText}`,
                raw: rawText,
              };
            }
            console.error("PayPal API Error Response Object:", errorData);
            console.error("Status Code:", res.status);

            const errorMessage =
              errorData.message ||
              errorData.error ||
              errorData.details ||
              `Server error: ${res.status} ${res.statusText}`;
            throw new Error(
              typeof errorMessage === "string"
                ? errorMessage
                : JSON.stringify(errorMessage)
            );
          }

          const orderData = await res.json();

          if (!orderData.id) {
            throw new Error("Invalid order response from server");
          }

          return orderData.id;
        } catch (error) {
          console.error("PayPal create order error:", error);
          showToast({
            type: "error",
            title: "Payment Error",
            message: error.message || "Failed to initialize PayPal payment",
          });
          setProcessingState(false);
          throw error;
        }
      }}
      onApprove={async (data) => {
        try {
          setProcessingState(true);

          const res = await fetch(`${API_BASE_URL}/api/paypal/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });

          if (!res.ok) {
            let errorData;
            try {
              errorData = await res.json();
            } catch {
              errorData = {
                error: `Server error: ${res.status} ${res.statusText}`,
              };
            }
            const errorMessage =
              errorData.message ||
              errorData.error ||
              `Server error: ${res.status} ${res.statusText}`;
            console.error("PayPal API error response:", errorData);
            throw new Error(errorMessage);
          }

          const captureData = await res.json();

          if (captureData.status !== "COMPLETED") {
            throw new Error("Payment was not completed");
          }

          showToast({
            type: "success",
            title: "Payment Successful",
            message: "PayPal payment completed ",
          });

          setProcessingState(false);
          onSuccess?.();
        } catch (error) {
          console.error("PayPal capture error:", error);
          showToast({
            type: "error",
            title: "Payment Failed",
            message: error.message || "Failed to process PayPal payment",
          });
          setProcessingState(false);
        }
      }}
      onError={(err) => {
        console.error("PayPal button error:", err);
        setProcessingState(false);
        showToast({
          type: "error",
          title: "Payment Error",
          message: "An error occurred with PayPal. Please try again.",
        });
      }}
      onCancel={() => {
        setProcessingState(false);
        showToast({
          type: "info",
          title: "Payment Cancelled",
          message: "You cancelled the PayPal payment",
        });
      }}
    />
  );
}
