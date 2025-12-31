import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    email: String,
    phone: String,
    address: String,

    payment: {
      type: String,
      enum: ["cash", "card", "paypal", "razorpay", "cod"],
      required: true,
    },

    shipping: Number,
    items: Array,
    total: Number,
    discount: { type: Number, default: 0 },
    coupon: {
      code: { type: String, default: null },
      discount: { type: Number, default: 0 },
      type: { type: String, default: null }
    },

    status: {
      type: String,
      enum: ["pending", "confirm", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
