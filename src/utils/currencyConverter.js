let cachedRate = null;
let lastFetched = 0;

async function getRate() {
    const now = Date.now();
    if (!cachedRate || now - lastFetched > 30 * 60 * 1000) {
        try {
            let rate = null;
            try {
                const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await res.json();
                rate = data.rates.INR;
            } catch (error) {
                console.log("Primary API failed, trying backup...");
            }

            if (!rate) {
                try {
                    const res = await fetch("https://api.exchangerate.host/convert?from=USD&to=INR");
                    const data = await res.json();
                    rate = data.info.rate;
                } catch (error) {
                    console.log("Backup API failed, trying third option...");
                }
            }

            if (!rate) {
                try {
                    const res = await fetch("https://api.fixer.io/latest?base=USD&symbols=INR");
                    const data = await res.json();
                    rate = data.rates.INR;
                } catch (error) {
                    console.log("All APIs failed, using fallback rate");
                }
            }

            if (rate && rate > 0) {
                cachedRate = rate;
                lastFetched = now;
                console.log(`Updated exchange rate: 1 USD = ${rate} INR`);
            } else {
                cachedRate = cachedRate || 83;
                console.log(`Using fallback rate: 1 USD = ${cachedRate} INR`);
            }
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
            cachedRate = cachedRate || 83;
        }
    }
    return cachedRate;
}

export async function convertUSDToINR(usdAmount) {
    const rate = await getRate();
    const convertedAmount = parseFloat(usdAmount) * rate;
    console.log(`Converting $${usdAmount} USD to ₹${convertedAmount.toFixed(2)} INR (Rate: ${rate})`);
    return convertedAmount;
}

export async function getExchangeRate() {
    return await getRate();
}

export async function refreshExchangeRate() {
    cachedRate = null;
    lastFetched = 0;
    return await getRate();
}