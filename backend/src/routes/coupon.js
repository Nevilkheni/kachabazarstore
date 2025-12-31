import express from "express";
import {
    getCoupons,
    getActiveCoupons,
    getCouponById,
    getCouponByCode,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    validateCoupon,
    checkCouponValidity,
    useCoupon
} from "../controllers/couponController.js";

const router = express.Router();
router.get("/getcoupons", getCoupons);
router.get("/active", getActiveCoupons);
router.get("/:id", getCouponById);
router.get("/code/:code", getCouponByCode);
router.post("/create", createCoupon);
router.put("/update/:id", updateCoupon);
router.delete("/delete/:id", deleteCoupon);
router.patch("/toggle-status/:id", toggleCouponStatus);
router.post("/validate", validateCoupon);
router.post("/check-validity", checkCouponValidity);
router.post("/use", useCoupon);
export default router;
 
