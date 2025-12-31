"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount }) {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        return data.id;
      }}
      onApprove={async (data) => {
        await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });

        alert("Payment successful");
      }}
    />
  );
}
