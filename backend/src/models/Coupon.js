import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        discountPercent: Number,
        code: String,
        minPurchase: Number,
        expiryDate: Date,
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
    },
    { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
