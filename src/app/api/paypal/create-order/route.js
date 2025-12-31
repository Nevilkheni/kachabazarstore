export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (!amount || isNaN(parseFloat(amount))) {
      return Response.json(
        { error: "Invalid amount provided" },
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

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-cart/checkout`,
          brand_name: "Your Store Name",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error("PayPal API error:", orderData);
      return Response.json(
        { error: orderData.message || "Failed to create PayPal order" },
        { status: response.status }
      );
    }

    return Response.json(orderData);
  } catch (error) {
    console.error("Error creating PayPal order:", error);
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