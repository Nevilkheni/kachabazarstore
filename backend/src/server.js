import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import categories from "./routes/categories.js";
import latestProducts from "./routes/latestProducts.js";
import popularProducts from "./routes/popularProducts.js";
import productReviews from "./routes/productReviews.js";
import relatedProducts from "./routes/relatedProducts.js";
import genericModify from "./routes/genericModify.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
connectDB();
app.use(cors());
app.use(express.json());
app.use(categories);
app.use(latestProducts);
app.use(popularProducts);
app.use(productReviews);
app.use(relatedProducts);
app.use(genericModify);
app.get("/", (req, res) => {
    res.send("api is run");
});
app.listen(PORT, () => {
    console.log("server start", PORT);
});
