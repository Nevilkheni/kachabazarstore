import express from "express";
import { removeItem, updateItem, replaceItem, addItem } from "../controllers/genericModifyController.js";

const router = express.Router();

router.delete("/api/:file/:id", removeItem);
router.patch("/api/:file/:id", updateItem);
router.put("/api/:file/:id", replaceItem);
router.post("/api/:file", addItem);

export default router;
