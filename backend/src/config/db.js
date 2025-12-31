import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kachabazaar';
        await mongoose.connect(uri);
        console.log(`MongoDB connected to: ${uri}`);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
};
