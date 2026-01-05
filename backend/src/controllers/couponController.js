import Coupon from "../models/Coupon.js";

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            data: coupons,
            message: "Coupons fetched successfully"
        });
    } catch (error) {
        console.error("Get Coupons Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch coupons",
            error: error.message
        });
    }
};

export const getActiveCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ status: "Active" }).sort({
            createdAt: -1,
        });
        res.json({
            success: true,
            data: coupons,
            message: "Active coupons fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching active coupons",
            error: error.message
        });
    }
};

export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.json({
            success: true,
            data: coupon,
            message: "Coupon found successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching coupon",
            error: error.message
        });
    }
};

export const getCouponByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            status: "Active"
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found or inactive"
            });
        }

        res.json({
            success: true,
            data: coupon,
            message: "Coupon found successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching coupon",
            error: error.message
        });
    }
};

export const createCoupon = async (req, res) => {
    try {
        const { title, image, discountPercent, code, minPurchase, status, expiryDate } = req.body;

        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exists"
            });
        }

        const newCoupon = new Coupon({
            title,
            image,
            discountPercent,
            code: code.toUpperCase(),
            minPurchase,
            expiryDate: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: status || "Active"
        });

        const savedCoupon = await newCoupon.save();

        res.status(201).json({
            success: true,
            data: savedCoupon,
            message: "Coupon created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating coupon",
            error: error.message
        });
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData.code && updateData.code.trim() !== '') {
            const existingCoupon = await Coupon.findOne({
                code: updateData.code.toUpperCase(),
                _id: { $ne: id }
            });
            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon code already exists"
                });
            }
            updateData.code = updateData.code.toUpperCase();
        } else if (updateData.hasOwnProperty('code')) {
            delete updateData.code;
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.json({
            success: true,
            data: updatedCoupon,
            message: "Coupon updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating coupon",
            error: error.message
        });
    }
};

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.json({
            success: true,
            data: deletedCoupon,
            message: "Coupon deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting coupon",
            error: error.message
        });
    }
};

export const toggleCouponStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        coupon.status = coupon.status === "Active" ? "Inactive" : "Active";
        const updatedCoupon = await coupon.save();

        res.json({
            success: true,
            data: updatedCoupon,
            message: `Coupon ${updatedCoupon.status.toLowerCase()} successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error toggling coupon status",
            error: error.message
        });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        if (!code || orderAmount === undefined || orderAmount === null) {
            return res.status(400).json({
                success: false,
                message: "Coupon code and order amount are required"
            });
        }

        const numericOrderAmount = parseFloat(orderAmount);
        if (isNaN(numericOrderAmount) || numericOrderAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order amount"
            });
        }

        const coupon = await Coupon.findOne({
            code: code.toUpperCase().trim(),
            status: "Active"
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid or inactive coupon code"
            });
        }

        if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
            return res.status(400).json({
                success: false,
                message: "This coupon has expired"
            });
        }

        if (numericOrderAmount < coupon.minPurchase) {
            return res.status(400).json({
                success: false,
                message: `Minimum purchase amount of $${coupon.minPurchase} required for this coupon`
            });
        }

        const discountAmount = Math.round((numericOrderAmount * coupon.discountPercent) / 100);
        const finalAmount = Math.max(0, numericOrderAmount - discountAmount);

        res.json({
            success: true,
            data: {
                coupon,
                orderAmount: numericOrderAmount,
                discountAmount,
                finalAmount,
                savings: discountAmount
            },
            message: "Coupon applied successfully"
        });
    } catch (error) {
        console.error("Coupon validation error:", error);
        res.status(500).json({
            success: false,
            message: "Error validating coupon",
            error: error.message
        });
    }
};
export
    const checkCouponValidity = async (req, res) => {
        try {
            const { code, orderAmount } = req.body;

            if (!code || orderAmount === undefined || orderAmount === null) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon code and order amount are required"
                });
            }

            const numericOrderAmount = parseFloat(orderAmount);
            if (isNaN(numericOrderAmount) || numericOrderAmount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order amount"
                });
            }

            const coupon = await Coupon.findOne({
                code: code.toUpperCase().trim(),
                status: "Active"
            });

            if (!coupon) {
                return res.json({
                    success: true,
                    data: {
                        isValid: false,
                        reason: "Invalid or inactive coupon code"
                    }
                });
            }

            if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
                return res.json({
                    success: true,
                    data: {
                        isValid: false,
                        reason: "This coupon has expired"
                    }
                });
            }

            if (numericOrderAmount < coupon.minPurchase) {
                return res.json({
                    success: true,
                    data: {
                        isValid: false,
                        reason: `Minimum purchase amount of $${coupon.minPurchase} required for this coupon`
                    }
                });
            }

            const discountAmount = Math.round((numericOrderAmount * coupon.discountPercent) / 100);

            res.json({
                success: true,
                data: {
                    isValid: true,
                    discountAmount,
                    coupon
                }
            });
        } catch (error) {
            console.error("Coupon validity check error:", error);
            res.status(500).json({
                success: false,
                message: "Error checking coupon validity",
                error: error.message
            });
        }
    };

export const useCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required"
            });
        }

        const coupon = await Coupon.findOne({
            code: code.toUpperCase().trim(),
            status: "Active"
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found or inactive"
            });
        }

        console.log(`Coupon ${code} used successfully`);

        res.json({
            success: true,
            message: "Coupon marked as used successfully"
        });
    } catch (error) {
        console.error("Coupon usage error:", error);
        res.status(500).json({
            success: false,
            message: "Error marking coupon as used",
            error: error.message
        });
    }
};