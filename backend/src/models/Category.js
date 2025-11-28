import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: String,
        slug: String,
        image: String,
    },
    { strict: false }
);

export default mongoose.model("Category", CategorySchema, "categories");
