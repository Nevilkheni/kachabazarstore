import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, default: null },
    githubId: { type: String, default: null },

    name: String,
    email: { type: String, default: null },
    avatar: { type: String, default: null },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", userSchema);
