
import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/api/categories", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
});

export default router;
