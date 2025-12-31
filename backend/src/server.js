import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import categories from "./routes/categories.js";
import latestProducts from "./routes/latestProducts.js";
import popularProducts from "./routes/popularProducts.js";
import productReviews from "./routes/productReviews.js";
import relatedProducts from "./routes/relatedProducts.js";
import search from "./routes/search.js";
import genericModify from "./routes/genericModify.js";
import couponRoutes from "./routes/coupon.js";
import session from "express-session";
import passport from "passport";
import "./passport.js";
import authRoutes from "./routes/auth.js";
import paypalRoutes from "./routes/paypal.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

await connectDB();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://192.168.1.10:3000",
            process.env.CROS_ORIGIN_URL
        ].filter(Boolean),
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", genericModify);

app.use(categories);
app.use(latestProducts);
app.use(popularProducts);
app.use(productReviews);
app.use(relatedProducts);
app.use(search);
app.use("/api/coupons", couponRoutes);

app.use("/api/paypal", paypalRoutes);
app.use("/api", orderRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Server running with Google login + product API");
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS Origin: ${process.env.CROS_ORIGIN_URL || 'http://localhost:3000'}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kachabazaar'}`);
    console.log("MongoDB connected");
});
