import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getModelForFile } from "../models/GenericItem.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
};

const importFile = async (fileBaseName, collectionNameOverride = null) => {
    const filePath = path.join(__dirname, "../data", fileBaseName + ".json");
    const raw = fs.readFileSync(filePath, "utf-8");
    let json = JSON.parse(raw);

    json = json.map(item => ({
        id: item.id ?? Date.now().toString() + Math.random().toString(36).slice(2),
        ...item
    }));

    const modelName = (collectionNameOverride || fileBaseName).toLowerCase();
    const Model = getModelForFile(modelName);

    await Model.deleteMany({});
    await Model.insertMany(json);

};

const run = async () => {
    try {
        await connectDB();
        await importFile("categories", "categories");
        await importFile("latestProducts", "latestproducts");
        await importFile("popularProducts", "popularproducts");
        await importFile("productReviews", "productreviews");
        await importFile("relatedProducts", "relatedproducts");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
