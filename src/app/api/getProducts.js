// const categoryAPI = "https://gist.githubusercontent.com/Nevilkheni/a0b3e4a431e7fa164f86fc3265fe3cbc/raw/categories.json";
const categoryAPI = "http://localhost:3001/api/categories"

export async function getcategory() {
    try {
        const res = await fetch(categoryAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch category");
        return await res.json();
    } catch (err) {
        console.error(" getPopularProducts error:", err);
        return [];
    }
}

// ==========================================================================================================================================


// const popularAPI = "https://69141c12f34a2ff1170e3233.mockapi.io/PopularProducts";
// const popularAPI = "https://gist.githubusercontent.com/Nevilkheni/bbf931f6fe6356e8a029ff29fb22da4a/raw/PopularProductsdata";
const popularAPI = "http://localhost:3001/api/popular-products";

export async function getPopularProducts() {
    try {
        const res = await fetch(popularAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch PopularProducts");
        return await res.json();
    } catch (err) {
        console.error(" getPopularProducts error:", err);
        return [];
    }
}

// ==========================================================================================================================================


// const latestAPI = "https://69141c12f34a2ff1170e3233.mockapi.io/LatestProducts";
// const latestAPI = "https://gist.githubusercontent.com/Nevilkheni/6004125f9a4a62055c6d356509f93690/raw/latestproducts";
const latestAPI = "http://localhost:3001/api/latest-products";

export async function getLatestProducts() {
    try {
        const res = await fetch(latestAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch latestProducts");
        return await res.json();
    } catch (err) {
        console.error(" getPopularProducts error:", err);
        return [];
    }
}

// ==========================================================================================================================================


const relatedproductAPI = "http://localhost:3001/api/related-products";

export async function getRelatedProducts() {
    try {
        const res = await fetch(relatedproductAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch latestProducts");
        return await res.json();
    } catch (err) {
        console.error(" getPopularProducts error:", err);
        return [];
    }
}


// ==========================================================================================================================================


const reviewsAPI = "http://localhost:3001/api/product-reviews";

export async function getreviewsData() {
    try {
        const res = await fetch(reviewsAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch reviews, mega L");
        return await res.json();
    } catch (err) {
        console.error("getreviewsData error:", err);
        return [];
    }
}