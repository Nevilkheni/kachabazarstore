import express from "express";
import { getModelForFile } from "../models/GenericItem.js";

const router = express.Router();

const getProductModels = () => {
    return {
        latestProducts: getModelForFile("latestproducts"),
        popularProducts: getModelForFile("popularproducts"),
        relatedProducts: getModelForFile("relatedproducts")
    };
};

router.get("/api/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === "") {
            return res.json([]);
        }

        const searchTerm = query.trim();
        const models = getProductModels();
        let allProducts = [];

        for (const [collectionName, Model] of Object.entries(models)) {
            try {
                const products = await Model.find({
                    name: { $regex: searchTerm, $options: "i" }
                });

                const productsWithSource = products.map(product => ({
                    ...product.toObject(),
                    source: collectionName
                }));

                allProducts = allProducts.concat(productsWithSource);
            } catch (err) {
                console.error(`Error searching in ${collectionName}:`, err);
            }
        }

        const uniqueProducts = allProducts.filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
        );

        uniqueProducts.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
            const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());

            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return 0;
        });

        res.json(uniqueProducts);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({
            msg: "Server error during search",
            error: err.message
        });
    }
});

export default router;