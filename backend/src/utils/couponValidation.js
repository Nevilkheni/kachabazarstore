
/**
 * Validates and sanitizes a coupon code
 * @param {string} code - The coupon code to validate
 * @returns {Object} - Validation result with isValid, sanitizedCode, and error message
 */
export const validateCouponCode = (code) => {
    if (!code || typeof code !== 'string') {
        return {
            isValid: false,
            error: "Coupon code is required and must be a string"
        };
    }

    const sanitizedCode = code.trim().toUpperCase();

    if (sanitizedCode.length === 0) {
        return {
            isValid: false,
            error: "Coupon code cannot be empty"
        };
    }

    if (sanitizedCode.length < 3 || sanitizedCode.length > 20) {
        return {
            isValid: false,
            error: "Coupon code must be between 3 and 20 characters"
        };
    }

    const validCodePattern = /^[A-Z0-9\-_]+$/;
    if (!validCodePattern.test(sanitizedCode)) {
        return {
            isValid: false,
            error: "Coupon code contains invalid characters. Only letters, numbers, hyphens, and underscores are allowed"
        };
    }

    return {
        isValid: true,
        sanitizedCode
    };
};

/**
 * @param {number|string} orderAmount - The order amount to validate
 * @returns {Object} - Validation result with isValid, numericAmount, and error message
 */
export const validateOrderAmount = (orderAmount) => {
    if (orderAmount === undefined || orderAmount === null) {
        return {
            isValid: false,
            error: "Order amount is required"
        };
    }

    const numericAmount = parseFloat(orderAmount);

    if (isNaN(numericAmount)) {
        return {
            isValid: false,
            error: "Order amount must be a valid number"
        };
    }

    if (numericAmount <= 0) {
        return {
            isValid: false,
            error: "Order amount must be greater than zero"
        };
    }

    if (numericAmount > 999999.99) {
        return {
            isValid: false,
            error: "Order amount is too large"
        };
    }

    return {
        isValid: true,
        numericAmount: Math.round(numericAmount * 100) / 100 // Round to 2 decimal places
    };
};

/**
 * @param {Date} expiryDate - The coupon expiry date
 * @returns {Object} - Check result with isExpired and error message
 */
export const checkCouponExpiry = (expiryDate) => {
    if (!expiryDate) {
        return { isExpired: false };
    }

    const now = new Date();
    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
        return {
            isExpired: true,
            error: "Invalid expiry date format"
        };
    }

    if (now > expiry) {
        return {
            isExpired: true,
            error: "This coupon has expired"
        };
    }

    return { isExpired: false };
};

/**
 * @param {number} orderAmount - The order amount
 * @param {number} discountPercent - The discount percentage
 * @param {number} maxDiscount - Optional maximum discount amount
 * @returns {number} - The calculated discount amount
 */
export const calculateDiscount = (orderAmount, discountPercent, maxDiscount = null) => {
    if (!orderAmount || !discountPercent || orderAmount <= 0 || discountPercent <= 0) {
        return 0;
    }

    let discountAmount = Math.round((orderAmount * discountPercent) / 100 * 100) / 100;

    if (maxDiscount && discountAmount > maxDiscount) {
        discountAmount = maxDiscount;
    }

    discountAmount = Math.min(discountAmount, orderAmount);

    return Math.max(0, discountAmount);
};

/**
 * @param {Object} coupon - The coupon object from database
 * @param {number} orderAmount - The order amount
 * @returns {Object} - Validation result
 */
export const validateCouponForOrder = (coupon, orderAmount) => {
    if (!coupon) {
        return {
            isValid: false,
            error: "Coupon not found"
        };
    }

    if (coupon.status !== "Active") {
        return {
            isValid: false,
            error: "This coupon is not active"
        };
    }

    const expiryCheck = checkCouponExpiry(coupon.expiryDate);
    if (expiryCheck.isExpired) {
        return {
            isValid: false,
            error: expiryCheck.error
        };
    }

    if (orderAmount < coupon.minPurchase) {
        return {
            isValid: false,
            error: `Minimum purchase amount of $${coupon.minPurchase} required for this coupon`
        };
    }

    const discountAmount = calculateDiscount(orderAmount, coupon.discountPercent, coupon.maxDiscount);

    if (discountAmount <= 0) {
        return {
            isValid: false,
            error: "This coupon provides no discount for your order"
        };
    }

    return {
        isValid: true,
        discountAmount,
        finalAmount: orderAmount - discountAmount
    };
};