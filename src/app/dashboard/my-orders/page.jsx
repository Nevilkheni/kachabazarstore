"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import { showToast } from "@/components/global/toast";

export default function MyOrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders?page=${page}&limit=10`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching orders:", error);
        showToast({
          type: "error",
          title: "Failed to Load Orders",
          message: "Could not fetch your orders. Please try again.",
        });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const changePage = (p) => {
    router.push(`/dashboard/my-orders?page=${p}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirm":
        return "bg-green-500 border-3 border-green-100";
      case "pending":
        return "bg-orange-500 border-3 border-orange-100";
      case "cancel":
        return "bg-red-500 border-3 border-red-100";
      default:
        return "bg-gray-500 border-3 border-gray-100";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "confirm":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancel":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatPaymentMethod = (payment) => {
    if (!payment) return "N/A";
    return payment.charAt(0).toUpperCase() + payment.slice(1);
  };

  if (loading) {
    return (
      <div className="bg-white text-black rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">My Orders</h1>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black rounded-lg p-6">
      <h1 className="text-lg font-medium font-sans py-2 mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto  rounded-lg  border-gray-100 border">
            <table className="w-full text-sm ">
              <thead className="bg-gray-50 text-gray-600 ">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">
                    Order ID
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Order Time
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Method
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Shipping
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Shipping Cost
                  </th>
                  <th className="px-3 py-1 text-left text-sm font-semibold text-gray-600">
                    Total
                  </th>
                  <th className="px-3 py-1 text-center text-sm font-semibold text-gray-600 ">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{order.orderId}</td>
                    <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      {formatPaymentMethod(order.payment)}
                    </td>

                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        />
                        {getStatusLabel(order.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3">UPS</td>
                    <td className="px-4 py-3">
                      ${order.shipping?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      ${order.total?.toFixed(2) || "0.00"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/order/${order.orderId}`}
                        className="text-green-600 hover:scale-110 transition inline-block"
                      >
                        <LuEye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 text-sm">
            <p className="text-gray-500">
              SHOWING {(page - 1) * 10 + 1}–
              {Math.min(page * 10, orders.length + (page - 1) * 10)}
            </p>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`h-8 w-8 rounded
                    ${
                      page === i + 1
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
