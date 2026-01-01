import { getApiUrl } from '@/utils/apiConfig';


const categoryAPI = getApiUrl() + "/api/categories";
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



const popularAPI = getApiUrl() + "/api/popularproducts";
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



const latestAPI = getApiUrl() + "/api/latestproducts";
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


const relatedproductAPI = getApiUrl() + "/api/relatedproducts";
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


const reviewsAPI = getApiUrl() + "/api/productreviews";
export async function getreviewsData() {
    try {
        const res = await fetch(reviewsAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return await res.json();
    } catch (err) {
        console.error("getreviewsData error:", err);
        return [];
    }
}


const couponsAPI = getApiUrl() + "/api/coupons/getcoupons";
export async function getCoupons() {
    try {
        const res = await fetch(couponsAPI, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch coupons");
        const response = await res.json();
        return response.data || [];
    } catch (err) {
        console.error("getCoupons error:", err);
        return [];
    }
}



const logoutAPI = getApiUrl() + "/auth/logout";
export async function logoutUser() {
    try {
        const res = await fetch(logoutAPI, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Logout failed");

        return true;
    } catch (err) {
        console.error("logoutUser error:", err);
        return false;
    }
}



const userAPI = getApiUrl() + "/auth/user";

export async function getAuthUser() {
    try {
        const res = await fetch(userAPI, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) return null;

        const text = await res.text();
        if (!text) return null;

        return JSON.parse(text);
    } catch (err) {
        console.error("getAuthUser error:", err);
        return null;
    }
}
