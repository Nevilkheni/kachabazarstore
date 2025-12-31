import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
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

const importCoupons = async () => {
    try {
        await connectDB();
        const filePath = path.join(__dirname, "../../../src/app/data/coupons.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const coupons = JSON.parse(raw);

        await Coupon.deleteMany({});
        console.log("Cleared existing coupons");

        await Coupon.insertMany(coupons);
        console.log(`Imported ${coupons.length} coupons successfully`);
        process.exit(0);
    } catch (err) {
        console.error("Error importing coupons:", err);
        process.exit(1);
    }
};

importCoupons();