export async function POST(request) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return Response.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("PayPal credentials missing");
      return Response.json(
        { error: "PayPal configuration error" },
        { status: 500 }
      );
    }

    const baseUrl = "https://api-m.sandbox.paypal.com";
    const accessToken = await getPayPalAccessToken(clientId, clientSecret, baseUrl);

    const response = await fetch(
      `${baseUrl}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await response.json();

    if (!response.ok) {
      console.error("PayPal capture error:", captureData);
      return Response.json(
        { error: captureData.message || "Failed to capture payment" },
        { status: response.status }
      );
    }

    return Response.json(captureData);
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getPayPalAccessToken(clientId, clientSecret, baseUrl) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}