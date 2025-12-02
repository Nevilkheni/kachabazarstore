// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import categories from "./routes/categories.js";
// import latestProducts from "./routes/latestProducts.js";
// import popularProducts from "./routes/popularProducts.js";
// import productReviews from "./routes/productReviews.js";
// import relatedProducts from "./routes/relatedProducts.js";
// import genericModify from "./routes/genericModify.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;
// connectDB();
// app.use(cors());
// app.use(express.json());
// app.use(categories);
// app.use(latestProducts);
// app.use(popularProducts);
// app.use(productReviews);
// app.use(relatedProducts);
// app.use(genericModify);
// app.get("/", (req, res) => {
//     res.send("api is run");
// });
// app.listen(PORT, () => {
//     console.log("server start", PORT);
// });


import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });


import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import categories from "./routes/categories.js";
import latestProducts from "./routes/latestProducts.js";
import popularProducts from "./routes/popularProducts.js";
import productReviews from "./routes/productReviews.js";
import relatedProducts from "./routes/relatedProducts.js";
import genericModify from "./routes/genericModify.js";

import session from "express-session";
import passport from "passport";
import "./passport.js";          // load strategy
import authRoute from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(
    cors({
        origin: "http://localhost:3000",
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
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(categories);
app.use(latestProducts);
app.use(popularProducts);
app.use(productReviews);
app.use(relatedProducts);
app.use(genericModify);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Server running with Google login + product API");
});

app.listen(PORT, () => {
    console.log("server started on", PORT);
    console.log("MongoDB connected");
});
