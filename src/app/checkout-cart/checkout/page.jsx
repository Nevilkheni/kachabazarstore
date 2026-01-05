"use client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} from "@/app/redux/cartSlice";
import { IoWallet } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { showToast } from "@/components/global/toast";
import { setOrder } from "@/app/redux/orderSlice";
import { useRouter } from "next/navigation";
import PayPalCheckout from "@/components/paypal/PayPalCheckout";
import RazorpayCheckout from "@/components/razorpay/RazorpayCheckout";
import CashfreeCheckout from "@/components/cashfree/CashfreeCheckout";
import CouponApply from "@/components/coupon/CouponApply";
import { useCouponContext } from "@/contexts/CouponContext";

export default function CheckoutForm() {
  const { totalAmount } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    appliedCoupon,
    couponDiscount,
    clearCoupon
  } = useCouponContext();

  const isFormValid = () => {
    const baseValid =
      form.firstName &&
      form.lastName &&
      form.email &&
      form.phone &&
      form.address &&
      form.city &&
      form.country &&
      form.zip &&
      form.shipping;

    return baseValid;
  };

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    firstName: user?.name || "",
    lastName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    country: "",
    zip: "",
    shipping: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    let sanitizedValue = value;

    if (key === "email" || key === "phone" || key === "zip") {
      sanitizedValue = value.replace(/\s/g, "");
    }

    setForm((prev) => ({ ...prev, [key]: sanitizedValue }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const router = useRouter();

  const validateFormFields = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    Object.keys(form).forEach((k) => {
      const val = typeof form[k] === "string" ? form[k].trim() : form[k];

      if (!val) {
        e[k] = "Required!";
      } else if (k === "email" && !emailRegex.test(val)) {
        e[k] = "Invalid email format!";
      } else if (k === "phone" && !phoneRegex.test(val)) {
        e[k] = "Must be 10 digits!";
      } else if (k === "zip" && (val.length < 5 || isNaN(val))) {
        e[k] = "Invalid zip code!";
      }
    });

    if (Object.keys(e).length !== 0) {
      setErrors(e);

      showToast({
        type: "error",
        title: "Missing info",
        message: "Please fill all required fields correctly",
      });

      return false;
    }

    return true;
  };

  const shippingCost =
    form.shipping === "today" ? 60 : form.shipping === "7days" ? 20 : 0;
  const subtotal = totalAmount;
  const total = subtotal + shippingCost - couponDiscount;

  const handleConfirmOrder = async () => {
    if (!items || items.length === 0 || totalAmount <= 0) {
      showToast({
        type: "error",
        title: "Empty cart",
        message:
          "Please add at least one product to your cart before checkout.",
      });
      return false;
    }

    if (!validateFormFields()) return false;

    if (!user) {
      showToast({
        type: "error",
        title: "Authentication Required",
        message: "Please log in to place an order",
      });
      router.push("/Auth/login");
      return false;
    }

    setIsProcessing(true);

    const orderData = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city}, ${form.country} - ${form.zip}`,
      payment: form.payment,
      shipping: shippingCost,
      items: items,
      total: total,
      coupon: appliedCoupon
        ? {
          code: appliedCoupon.code,
          discount: couponDiscount,
          type: appliedCoupon.discountType || 'percentage',
        }
        : null,
      status: "pending",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to create order" }));
        console.error("Order creation error:", errorData);
        throw new Error(errorData.message || "Failed to create order");
      }

      const createdOrder = await response.json();
      const orderId = createdOrder.orderId;

      if (appliedCoupon) {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/coupons/use`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code: appliedCoupon.code,
              }),
            }
          );
        } catch (couponError) {
          console.error("Error marking coupon as used:", couponError);
        }
      }

      dispatch(
        setOrder({
          ...orderData,
          orderId,
          date: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          discount: couponDiscount,
        })
      );

      dispatch(clearCart());
      clearCoupon();

      router.push(`/dashboard/my-orders`);
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      showToast({
        type: "error",
        title: "Order Failed",
        message: error.message || "Failed to create order. Please try again.",
      });
      setIsProcessing(false);
      return false;
    }
  };

  const handlePayment = async () => {
    const ok = await handleConfirmOrder();
    if (!ok) return;
  };

  return (
    <div className="bg-[#f9fafb] px-3 sm:px-10">
      <div className="flex lg:gap-10 xl:gap-14 flex-col lg:flex-row-reverse max-w-[1450px] text-black py-3 mx-auto">
        <div className="w-full lg:w-[40%] py-7 lg:py-8 rounded-xl overflow-hidden">
          <div className="p-5 lg:p-8 border rounded-lg border-gray-200 bg-white">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="max-h-60 bg-gray-50 overflow-y-scroll scrollbar-hide">
              {items.map((item, index) => {
                const idKey = item.name;

                return (
                  <div
                    key={index}
                    className={`flex gap-4 items-center justify-between py-4 border-gray-200 ${index === 0 ? "pt-7" : "border-t"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image || "/assets/placeholder_kvepfp.png"}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded cursor-pointer h-20 w-20 shrink-0 bg-gray-100 p-2"
                      />
                    </div>
                    <div className="w-full">
                      <div className="items-center gap-4 flex justify-between w-full">
                        <div className="space-y-1">
                          <p className="font-medium text-sm font-sans">
                            {item.name}
                          </p>
                          <p className="text-[12px] font-sans text-gray-400">
                            Item Price ${item.price}
                          </p>
                        </div>

                        <button
                          onClick={() => dispatch(deleteFromCart(idKey))}
                          className="text-red-500 text-lg mb-auto cursor-pointer"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>

                      <div className="items-center gap-4 mt-px flex justify-between w-full">
                        <p className="text-emerald-600 font-bold font-sans">
                          {item.price}
                        </p>
                        <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 bg-white">
                          <button
                            onClick={() => dispatch(removeFromCart(idKey))}
                          >
                            <HiOutlineMinus className="text-[15px] cursor-pointer mx-0.5" />
                          </button>

                          <span className="mx-3 text-[15px]">
                            {item.quantity}
                          </span>

                          <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
                            <HiPlus className="text-[15px] cursor-pointer mx-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <CouponApply
              totalAmount={totalAmount}
              className="my-8"
            />

            <div>
              <div className="space-y-4 -mt-3 font-semibold text-sm text-gray-600 font-sans">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <span className="font-bold font-sans">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p>Shipping Cost</p>
                  <span className="font-bold font-sans">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <span className="text-orange-400 font-bold font-sans">
                    ${couponDiscount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 my-6"></div>

              <div className="flex -mt-1 justify-between items-center font-semibold text-lg">
                <span className="text-gray-900 font-sans font-bold text-sm">
                  TOTAL COST
                </span>
                <span className="font-extrabold font-sans">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%]">
          <div className="mx-auto bg-[#f9fafb] rounded-lg -mt-2 lg:mt-0 lg:py-9">
            <h2 className="text-md font-medium mb-3">01. Personal Details</h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Input
                label="First Name"
                value={form.firstName}
                required
                error={errors.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />

              <Input
                label="Last Name"
                value={form.lastName}
                required
                error={errors.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />

              <Input
                label="Email Address"
                value={form.email}
                required
                error={errors.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <Input
                label="Phone Number"
                value={form.phone}
                required
                maxLength={10}
                minLength={10}
                error={errors.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <h2 className="text-md font-medium font-sans text-gray-600 mt-12 mb-3">
              02. Shipping Details
            </h2>
            <Input
              full
              label="Street Address"
              value={form.address}
              required
              error={errors.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <Input
                label="City"
                value={form.city}
                required
                error={errors.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />

              <Input
                label="Country"
                value={form.country}
                required
                error={errors.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />

              <Input
                label="Zip Code"
                value={form.zip}
                required
                error={errors.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>

            <p className="font-sans text-sm font-medium mb-2 mt-8">
              Shipping Cost
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <ShippingOption
                title="UPS"
                desc="Delivery: Today"
                price="60"
                checked={form.shipping === "today"}
                onChange={() => handleChange("shipping", "today")}
                required
                error={errors.shipping}
              />

              <ShippingOption
                title="UPS"
                desc="Delivery: 7 Days"
                price="20"
                checked={form.shipping === "7days"}
                onChange={() => handleChange("shipping", "7days")}
                error={errors.shipping}
              />
            </div>

            <h2 className="text-md font-medium font-sans text-gray-600 mt-12 mb-3">
              03. Payment Method
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <PaymentOption
                title="Cash"
                icon={<IoWallet />}
                checked={form.payment === "cash"}
                onChange={() => handleChange("payment", "cash")}
                error={errors.payment}
              />

              <PaymentOption
                title="Card"
                icon={<ImCreditCard />}
                checked={form.payment === "card"}
                onChange={() => {
                  if (!isFormValid() && form.payment !== "card") {
                    showToast({
                      type: "error",
                      title: "Fill details first",
                      message: "Complete shipping details before card payment",
                    });
                    return;
                  }
                  handleChange("payment", "card");
                }}
                error={errors.payment}
              />

              <PaymentOption
                title="Paypal"
                icon={<ImCreditCard />}
                checked={form.payment === "paypal"}
                onChange={() => {
                  if (!isFormValid()) {
                    showToast({
                      type: "error",
                      title: "Hold up",
                      message: "Fill all details before PayPal payment",
                    });
                    return;
                  }
                  handleChange("payment", "paypal");
                }}
                error={errors.payment}
              />

              <PaymentOption
                title="Razorpay"
                icon={<ImCreditCard />}
                checked={form.payment === "razorpay"}
                onChange={() => {
                  if (!isFormValid()) {
                    showToast({
                      type: "error",
                      title: "Hold up",
                      message: "Fill all details before Razorpay payment",
                    });
                    return;
                  }
                  handleChange("payment", "razorpay");
                }}
                error={errors.payment}
              />

              <PaymentOption
                title="Cashfree"
                icon={<ImCreditCard />}
                checked={form.payment === "cashfree"}
                onChange={() => {
                  if (!isFormValid()) {
                    showToast({
                      type: "error",
                      title: "Hold up",
                      message: "Fill all details before Cashfree payment",
                    });
                    return;
                  }
                  handleChange("payment", "cashfree");
                }}
                error={errors.payment}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/"
                className="w-full gap-2 text-sm font-medium font-sans flex justify-center bg-indigo-500 text-white py-2.5 rounded-md hover:bg-indigo-600"
              >
                <IoReturnUpBack /> Continue Shopping
              </Link>

              {form.payment === "paypal" || form.payment === "card" ? (
                <div className="w-full h-10 opacity-99">
                  <PayPalCheckout
                    amount={total.toFixed(2)}
                    onProcessingChange={setIsProcessing}
                    fundingSource={
                      form.payment === "paypal" ? "paypal" : "card"
                    }
                    onSuccess={async () => {
                      const ok = await handleConfirmOrder();
                      if (!ok) {
                        setIsProcessing(false);
                      }
                    }}
                  />
                </div>
              ) : form.payment === "razorpay" ? (
                <div className="w-full">
                  <RazorpayCheckout
                    amount={total.toFixed(2)}
                    onProcessingChange={setIsProcessing}
                    orderData={{
                      name: `${form.firstName} ${form.lastName}`,
                      email: form.email,
                      phone: form.phone,
                      address: `${form.address}, ${form.city}, ${form.country} - ${form.zip}`,
                    }}
                    onValidateAndCreateOrder={handleConfirmOrder}
                    onSuccess={() => {
                      router.push(`/dashboard/my-orders`);
                    }}
                  />
                </div>
              ) : form.payment === "cashfree" ? (
                <div className="w-full">
                  <CashfreeCheckout
                    amount={total.toFixed(2)}
                    onProcessingChange={setIsProcessing}
                    orderData={{
                      name: `${form.firstName} ${form.lastName}`,
                      email: form.email,
                      phone: form.phone,
                      address: `${form.address}, ${form.city}, ${form.country} - ${form.zip}`,
                    }}
                    onValidateAndCreateOrder={handleConfirmOrder}
                    onSuccess={() => {
                      router.push(`/dashboard/my-orders`);
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full gap-2 text-sm font-medium font-sans flex justify-center py-2.5 rounded-md transition-colors
                  ${isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-500  opacity-50 hover:bg-teal-600 text-white"
                    }`}
                >
                  {isProcessing ? (
                    "Loading..."
                  ) : (
                    <>
                      Confirm Order <FaArrowRight />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  full,
  error,
  maxLength,
  minLength,
  type = "text",
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-emerald-500 focus:ring-1 focus:outline-none duration-200"
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {typeof error === "string" ? error : `${label} is required!`}
        </p>
      )}
    </div>
  );
}

function ShippingOption({ title, desc, price, checked, onChange, error }) {
  return (
    <div>
      <label
        className={`flex justify-between items-center border cursor-pointer bg-white rounded-lg p-3 duration-200 ${checked ? "outline-none border-gray-200" : "border-gray-200"
          }`}
      >
        <div className="flex gap-3 items-center">
          <FiTruck
            className={`${checked ? "text-gray-400" : "text-gray-400"
              } text-2xl`}
          />
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-gray-500">
              {desc} – ${price}
            </p>
          </div>
        </div>

        <input
          type="radio"
          name="shipping"
          checked={checked}
          onChange={onChange}
          className="accent-blue-500"
        />
      </label>
      {error && (
        <p className="text-sm text-red-500 mt-1">{title} Method is required!</p>
      )}
    </div>
  );
}

function PaymentOption({ title, icon, checked, onChange, error }) {
  return (
    <div>
      <label
        className={`flex justify-between items-center border cursor-pointer rounded-md p-3 bg-white duration-200 ${checked ? "outline-none border-gray-200 " : "border-gray-200"
          }`}
      >
        <div className="flex gap-3 items-center">
          <span
            className={`text-xl ${checked ? "text-gray-400" : "text-gray-400"}`}
          >
            {icon}
          </span>
          <p className="text-sm font-medium">{title}</p>
        </div>

        <input
          type="radio"
          name="payment"
          checked={checked}
          onChange={onChange}
          className="accent-blue-500"
        />
      </label>
      {error && (
        <p className="text-sm text-red-500 mt-1">{title} Method is required!</p>
      )}
    </div>
  );
}