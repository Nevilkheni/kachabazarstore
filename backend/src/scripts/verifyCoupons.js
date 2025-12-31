import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Coupon from "../models/Coupon.js";

dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "backend/.env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kachabazaar";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
};

const verifyCoupons = async () => {
    try {
        await connectDB();

        const coupons = await Coupon.find({});
        console.log(`Found ${coupons.length} coupons in database:`);

        coupons.forEach((coupon, index) => {
            console.log(`${index + 1}. ${coupon.title} - ${coupon.code} (${coupon.status})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Error verifying coupons:", err);
        process.exit(1);
    }
};

verifyCoupons();