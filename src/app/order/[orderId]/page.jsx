"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { showToast } from "@/components/global/toast";

export default function InvoicePage() {
  const { orderId } = useParams();
  const reduxOrder = useSelector((state) => state.order.order);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (reduxOrder && reduxOrder.orderId === orderId) {
        setOrder(reduxOrder);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const orderData = await res.json();
          setOrder({
            ...orderData,
            date: new Date(orderData.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            discount: 0,
          });
        } else {
          showToast({
            type: "error",
            title: "Order Not Found",
            message: "The requested order could not be found.",
          });
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        showToast({
          type: "error",
          title: "Failed to Load Order",
          message: "Could not fetch order details. Please try again.",
        });
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, reduxOrder]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading invoice...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Invoice not found
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById("invoice-pdf");
    if (!element) return;

    setPdfLoading(true);

    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;

      await html2pdf()
        .set({
          margin: 0.3,
          filename: `invoice-${order.orderId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(element)
        .save();

      showToast({
        type: "success",
        title: "PDF Downloaded",
        message: "Invoice has been downloaded successfully.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      showToast({
        type: "error",
        title: "Download Failed",
        message: "Could not generate PDF. Please try again.",
      });
    }

    setPdfLoading(false);
  };

  const subtotal = order.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const total = subtotal + order.shipping - order.discount;

  return (
    <div className="px-4 text-gray-900">
      <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
        <div className="bg-emerald-100 text-emerald-800 px-4 py-3 rounded-md mb-6">
          Thank You{" "}
          <span className="font-bold text-emerald-600">{order.name}</span>, your
          order has been received!
        </div>

        <div
          id="invoice-pdf"
          className="rounded-lg pdf-safe overflow-hidden bg-white"
        >
          <div className="bg-[#f1f5ff] px-8 py-7 space-y-5">
            <div className="flex justify-between items-start">
              <h2 className="flex flex-col text-2xl font-bold">
                INVOICE
                <span className="text-gray-500 text-sm font-normal">
                  Status : {order.payment === "Paid" ? "PAID" : "UNPAID"}
                </span>
              </h2>

              <div className="flex flex-col items-end text-sm">
                <Image
                  src="https://kachabazar-store-nine.vercel.app/logo/logo-color.svg"
                  alt="logo"
                  width={120}
                  height={40}
                  className="w-28"
                />
                <p className="text-gray-500 max-w-xs text-right">
                  59 Station Rd, Purls Bridge, United Kingdom
                </p>
              </div>
            </div>

            <div className="h-px bg-white" />

            <div className="flex justify-between text-sm">
              <div>
                <p className="font-bold text-gray-500">DATE</p>
                <p>{order.date}</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-gray-500">INVOICE NO.</p>
                <p>#{order.orderId}</p>
              </div>

              <div className="text-right">
                <p className="font-bold">INVOICE TO</p>
                <p>{order.name}</p>
                <div className="flex gap-2 justify-end">
                  <p className="text-gray-500">{order.email}</p>
                  <p className="text-gray-500">{order.phone}</p>
                </div>
                <p className="text-gray-500 max-w-sm">{order.address}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <table className="w-full border text-sm">
              <thead className="bg-gray-50 border-b text-xs">
                <tr>
                  <th className="p-3 text-left w-16">SR.</th>
                  <th className="p-3 text-left">PRODUCT</th>
                  <th className="p-3 text-center w-24">QTY</th>
                  <th className="p-3 text-center w-32">PRICE</th>
                  <th className="p-3 text-right w-32">AMOUNT</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, i) => {
                  const price = Number(item.price);
                  return (
                    <tr key={i} className="border-b last:border-none">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3 text-gray-600">{item.name}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-center">${price.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        ${(price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-b p-8 bg-emerald-50">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div>
                <p className="font-semibold">PAYMENT METHOD</p>
                <p>{order.payment}</p>
              </div>

              <div>
                <p className="font-semibold">SHIPPING</p>
                <p>${order.shipping.toFixed(2)}</p>
              </div>

              <div>
                <p className="font-semibold">DISCOUNT</p>
                <p>${order.discount.toFixed(2)}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">TOTAL</p>
                <p className="text-red-500 text-xl font-bold">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex bg-white no-print shadow p-6 mt-6 justify-between items-center">
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className={`px-5 py-2 rounded-md text-sm text-white ${
              pdfLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {pdfLoading ? "Generating PDF..." : "Download PDF"}
          </button>

          <button
            onClick={() => window.print()}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md text-sm"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
