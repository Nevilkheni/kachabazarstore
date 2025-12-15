import express from "express";
import { getModelForFile } from "../models/GenericItem.js";

const router = express.Router();
const Model = getModelForFile("relatedproducts");

router.get("/api/relatedproducts", async (req, res) => {
    try {
        const docs = await Model.find({});
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
});

export default router;
