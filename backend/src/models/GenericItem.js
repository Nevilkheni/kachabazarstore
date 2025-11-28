import mongoose from "mongoose";

const GenericItemSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true },
    },
    { strict: false }
);

export const getModelForFile = (file) => {
    const collectionName = file.toLowerCase();

    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }

    return mongoose.model(collectionName, GenericItemSchema, collectionName);
};
