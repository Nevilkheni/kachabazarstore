import express from 'express';

const router = express.Router();

const CASHFREE_BASE_URL = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

const CASHFREE_API_VERSION = '2023-08-01';

router.post('/create-session', async (req, res) => {
    try {
        const { amount, orderData } = req.body;

        console.log('Cashfree create-session request:', { amount, orderData });

        if (!amount || !orderData) {
            return res.status(400).json({
                success: false,
                message: 'Amount and order data are required'
            });
        }

        if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
            console.error('Cashfree credentials not set');
            return res.status(500).json({
                success: false,
                message: 'Cashfree credentials not configured'
            });
        }

        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

        const requestData = {
            order_amount: parseFloat(amount) / 100, // Convert from paise to rupees
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: `customer_${Date.now()}`,
                customer_name: orderData.name || "Customer",
                customer_email: orderData.email || "customer@example.com",
                customer_phone: orderData.phone || "9999999999",
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?order_id=${orderId}`,
                notify_url: `${process.env.API_URL || 'http://localhost:8000'}/api/cashfree/webhook`,
            },
        };

        console.log('Cashfree API request data:', requestData);
        console.log('Cashfree API URL:', `${CASHFREE_BASE_URL}/orders`);

        const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                'x-api-version': CASHFREE_API_VERSION
            },
            body: JSON.stringify(requestData)
        });

        console.log('Cashfree API response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Cashfree API error:', errorData);
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }

        const sessionData = await response.json();
        console.log('Cashfree API response data:', sessionData);

        if (sessionData && sessionData.payment_session_id) {
            res.json({
                success: true,
                payment_session_id: sessionData.payment_session_id,
                order_id: orderId,
                order_token: sessionData.order_token,
            });
        } else {
            throw new Error('Invalid response from Cashfree API');
        }
    } catch (error) {
        console.error('Cashfree session creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create payment session',
        });
    }
});

router.post('/verify-payment', async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required'
            });
        }

        const response = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                'x-api-version': CASHFREE_API_VERSION
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || 'Failed to fetch order details');
        }

        const orderData = await response.json();

        if (orderData) {
            const orderStatus = orderData.order_status;

            if (orderStatus === 'PAID') {
                res.json({
                    success: true,
                    message: 'Payment verified successfully',
                    order_status: orderStatus,
                    payment_details: orderData,
                });
            } else if (orderStatus === 'PENDING') {
                res.json({
                    success: false,
                    message: 'Payment is pending - Late Authorization',
                    order_status: orderStatus,
                });
            } else {
                res.json({
                    success: false,
                    message: `Payment failed. Status: ${orderStatus}`,
                    order_status: orderStatus,
                });
            }
        } else {
            throw new Error('Failed to fetch order details');
        }
    } catch (error) {
        console.error('Cashfree payment verification error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to verify payment',
        });
    }
});

router.post('/webhook', async (req, res) => {
    try {
        const { orderId, orderAmount, paymentStatus, txStatus, txMsg, txTime } = req.body;

        console.log('Cashfree webhook received:', {
            orderId,
            orderAmount,
            paymentStatus,
            txStatus,
            txMsg,
            txTime,
        });


        res.status(200).json({
            success: true,
            message: 'Webhook received successfully',
        });
    } catch (error) {
        console.error('Cashfree webhook error:', error);
        res.status(500).json({
            success: false,
            message: 'Webhook processing failed',
        });
    }
});

router.get('/payment-status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const response = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                'x-api-version': CASHFREE_API_VERSION
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Order not found');
        }

        const orderData = await response.json();

        if (orderData) {
            res.json({
                success: true,
                order_status: orderData.order_status,
                payment_details: orderData,
            });
        } else {
            throw new Error('Order not found');
        }
    } catch (error) {
        console.error('Cashfree status check error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to check payment status',
        });
    }
});

router.get('/test', (_, res) => {
    res.json({
        success: true,
        message: 'Cashfree integration is working',
        environment: process.env.CASHFREE_ENVIRONMENT || 'SANDBOX',
        config: {
            app_id: process.env.CASHFREE_APP_ID ? 'Set' : 'Not set',
            secret_key: process.env.CASHFREE_SECRET_KEY ? 'Set' : 'Not set',
            environment: process.env.CASHFREE_ENVIRONMENT || 'SANDBOX',
            base_url: CASHFREE_BASE_URL,
        },
        integration_flow: {
            step1: 'Setup Config - Environment and API Keys configured',
            step2: 'Initialize SDK - JS SDK loaded on client side',
            step3: 'Create Order - Backend API creates order and returns payment session ID',
            step4: 'Load Checkout - Client uses payment session ID to open checkout',
            step5: 'Get Payments - Backend verifies payment status after completion'
        },
        payment_states: {
            success: 'PAID - Transaction successful',
            pending: 'PENDING - Late Authorization',
            failure: 'FAILED/CANCELLED - User dropped or transaction failed'
        }
    });
});

export default router;