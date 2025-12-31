import express from "express";

const router = express.Router();

const getPaypalBase = () => {
    let base = process.env.PAYPAL_BASE_URL;

    if (base && base.includes("sandbox.paypal.com") && !base.includes("api-m")) {
        console.warn("PAYPAL_BASE_URL seems to be the website URL, correcting to API URL");
        return "https://api-m.sandbox.paypal.com";
    }

    if (!base) {
        console.warn("PAYPAL_BASE_URL is not defined, defaulting to sandbox API");
        return "https://api-m.sandbox.paypal.com";
    }
    return base;
};

const getAccessToken = async () => {
    const PAYPAL_BASE = getPaypalBase();

    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET ||
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET ||
        process.env.NEXT_PUBLIC_PAYPAL_SECRATE_ID;

    if (!clientId || !clientSecret) {
        console.error("PayPal credentials missing. Found Client ID:", !!clientId, "Found Secret:", !!clientSecret);
        throw new Error("PayPal credentials are not configured correctly. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    console.log("Requesting PayPal access token...");
    const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) {
        let errorData;
        try {
            errorData = await res.json();
        } catch {
            const bodyText = await res.text().catch(() => "No body");
            errorData = { message: "Could not parse error response", status: res.status, body: bodyText };
        }
        console.error("PayPal access token error:", errorData);
        throw new Error(`Failed to get PayPal access token: ${errorData.error_description || errorData.message || res.statusText}`);
    }

    const data = await res.json();
    if (!data.access_token) {
        throw new Error("PayPal access token not received");
    }

    return data.access_token;
};

router.post("/create-order", async (req, res) => {
    try {
        console.log("=== PayPal create-order started ===");
        console.log("Body:", req.body);
        const { amount } = req.body;

        const amountNum = parseFloat(amount);
        if (!amount || isNaN(amountNum) || amountNum <= 0) {
            return res.status(400).json({ error: "Invalid amount", received: amount });
        }

        const amountString = amountNum.toFixed(2);
        console.log("Amount to be charged:", amountString);

        let token;
        try {
            token = await getAccessToken();
        } catch (tokenError) {
            console.error("Token error in create-order:", tokenError.message);
            return res.status(401).json({
                error: "PayPal authentication failed",
                details: tokenError.message
            });
        }

        const PAYPAL_BASE = getPaypalBase();
        const response = await fetch(
            `${PAYPAL_BASE}/v2/checkout/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: amountString,
                            },
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                const text = await response.text().catch(() => "N/A");
                errorData = { message: "Non-JSON error response", status: response.status, body: text };
            }
            console.error("PayPal Order API Error:", JSON.stringify(errorData, null, 2));
            return res.status(response.status).json({
                error: "PayPal order creation failed",
                message: errorData.message || errorData.error_description || "PayPal API error",
                details: errorData
            });
        }

        const order = await response.json();
        console.log("PayPal order created successfully:", order.id);
        res.json(order);
    } catch (err) {
        console.error("PayPal create order exception:", err);
        res.status(500).json({ error: "Server exception", message: err.message });
    }
});

router.post("/capture-order", async (req, res) => {
    try {
        console.log("=== PayPal capture-order started ===");
        const { orderID } = req.body;

        if (!orderID) {
            return res.status(400).json({ error: "Order ID is required" });
        }

        let token;
        try {
            token = await getAccessToken();
        } catch (tokenError) {
            console.error("Token error in capture-order:", tokenError.message);
            return res.status(401).json({
                error: "PayPal authentication failed",
                details: tokenError.message
            });
        }

        const PAYPAL_BASE = getPaypalBase();
        const response = await fetch(
            `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                const text = await response.text().catch(() => "N/A");
                errorData = { message: "Non-JSON error response", status: response.status, body: text };
            }
            console.error("PayPal Capture API Error:", JSON.stringify(errorData, null, 2));
            return res.status(response.status).json({
                error: "PayPal capture failed",
                message: errorData.message || errorData.error_description || "PayPal API error",
                details: errorData
            });
        }

        const captureData = await response.json();
        console.log("PayPal order captured successfully:", captureData.status);
        res.json(captureData);
    } catch (err) {
        console.error("PayPal capture order exception:", err);
        res.status(500).json({ error: "Server exception", message: err.message });
    }
});

export default router;

