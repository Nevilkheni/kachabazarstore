import express from "express";
import { removeItem, updateItem, replaceItem, addItem } from "../controllers/genericModifyController.js";

const router = express.Router();

router.delete("/:file/:id", removeItem);
router.patch("/:file/:id", updateItem);
router.put("/:file/:id", replaceItem);
router.post("/:file", addItem);


export default router;

