import express from "express";
import Order from "../models/Order.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

const generateOrderId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderId = "";
  for (let i = 0; i < 4; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
};

router.post("/orders/create", isAuth, async (req, res) => {
  try {
    const { items, total } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) { 
      return res
        .status(400)
        .json({ message: "Cannot create order with an empty cart" });
    }

    if (typeof total !== "number" || total <= 0) {
      return res
        .status(400)
        .json({ message: "Order total must be greater than zero" });
    }

    let orderId;
    let isUnique = false;

    while (!isUnique) {
      orderId = generateOrderId();
      const existingOrder = await Order.findOne({ orderId });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    const order = await Order.create({
      ...req.body,
      orderId,
      user: req.user._id,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Order creation failed",
      error: error.name === "ValidationError" ? error.errors : undefined,
    });
  }
});

router.get("/orders/my-orders", isAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders,
      totalPages,
      currentPage: page,
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/orders/:orderId", isAuth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      orderId,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

export default router;
