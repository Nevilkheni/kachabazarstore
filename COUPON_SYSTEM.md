# Coupon System Documentation

## Overview
The coupon system has been strengthened with improved validation, reusable components, and better error handling.

## Components Created

### 1. CouponApply Component (`src/components/coupon/CouponApply.jsx`)
A reusable component for applying coupons with:
- **Strong client-side validation**
- **Real-time feedback**
- **Loading states**
- **Error handling**
- **Keyboard support (Enter key)**
- **Character limits and pattern validation**

**Props:**
- `totalAmount` - Current cart total
- `onCouponApplied` - Callback when coupon is successfully applied
- `onCouponRemoved` - Callback when coupon is removed
- `appliedCoupon` - Currently applied coupon object
- `couponDiscount` - Current discount amount
- `className` - Additional CSS classes
- `showRemoveButton` - Whether to show remove button

### 2. useCoupon Hook (`src/hooks/useCoupon.js`)
A custom hook for managing coupon state with:
- **Automatic validity checking** when cart total changes
- **State management** for applied coupons and discounts
- **Performance optimizations** to prevent unnecessary API calls
- **Error handling** and user notifications

**Returns:**
- `appliedCoupon` - Currently applied coupon
- `couponDiscount` - Current discount amount
- `applyCoupon(coupon, discount)` - Apply a coupon
- `removeCoupon()` - Remove current coupon
- `clearCoupon()` - Clear coupon (for checkout completion)

## Updated Pages

### 1. Checkout Page (`src/app/checkout-cart/checkout/page.jsx`)
- Replaced duplicate coupon logic with `CouponApply` component
- Uses `useCoupon` hook for state management
- Automatic coupon validation when cart changes
- Improved error handling and user feedback

### 2. Order Summary Page (`src/app/checkout-cart/ordersummary/page.jsx`)
- Replaced duplicate coupon logic with `CouponApply` component
- Uses `useCoupon` hook for state management
- Added remove button functionality
- Consistent UI/UX with checkout page

## Backend Improvements

### 1. Enhanced Validation (`backend/src/controllers/couponController.js`)
The `validateCoupon` function now includes:
- **Input sanitization** and type checking
- **Character validation** (alphanumeric, hyphens, underscores only)
- **Length validation** (3-20 characters)
- **Improved error messages**
- **Better rounding** for discount calculations
- **Security improvements** (don't expose internal fields)

### 2. Validation Utilities (`backend/src/utils/couponValidation.js`)
Utility functions for:
- `validateCouponCode()` - Code format validation
- `validateOrderAmount()` - Amount validation
- `checkCouponExpiry()` - Expiry date checking
- `calculateDiscount()` - Discount calculation with rounding
- `validateCouponForOrder()` - Comprehensive validation

## Key Features

### Client-Side Validation
- **Input sanitization** before sending to server
- **Character limits** and pattern validation
- **Real-time feedback** for invalid inputs
- **Duplicate application prevention**

### Server-Side Security
- **Input validation** and sanitization
- **SQL injection prevention** through proper querying
- **Rate limiting** considerations (can be added)
- **Error message standardization**

### User Experience
- **Loading states** during validation
- **Clear error messages** with specific reasons
- **Success notifications** with savings amount
- **Automatic removal** when coupon becomes invalid
- **Keyboard accessibility** (Enter key support)

### Performance
- **Debounced validation** to prevent excessive API calls
- **Memoized callbacks** to prevent unnecessary re-renders
- **Optimized re-validation** only when cart total changes
- **Proper cleanup** to prevent memory leaks

## Usage Examples

### Using the CouponApply Component
```jsx
import CouponApply from "@/components/coupon/CouponApply";
import { useCoupon } from "@/hooks/useCoupon";

function MyComponent() {
  const { totalAmount } = useSelector((state) => state.cart);
  const {
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useCoupon(totalAmount);

  return (
    <CouponApply
      totalAmount={totalAmount}
      onCouponApplied={applyCoupon}
      onCouponRemoved={removeCoupon}
      appliedCoupon={appliedCoupon}
      couponDiscount={couponDiscount}
      showRemoveButton={true}
    />
  );
}
```

### Backend API Usage
```javascript
// POST /api/coupons/validate
{
  "code": "SAVE20",
  "orderAmount": 100.00
}

// Response
{
  "success": true,
  "data": {
    "coupon": { /* coupon details */ },
    "orderAmount": 100.00,
    "discountAmount": 20.00,
    "finalAmount": 80.00,
    "savings": 20.00
  },
  "message": "Coupon applied successfully"
}
```

## Security Considerations

1. **Input Validation**: All inputs are validated both client and server-side
2. **Sanitization**: Coupon codes are sanitized to prevent injection attacks
3. **Rate Limiting**: Consider adding rate limiting for coupon validation endpoints
4. **Audit Trail**: Consider logging coupon usage for fraud detection
5. **Expiry Handling**: Proper timezone handling for expiry dates

## Future Enhancements

1. **Usage Limits**: Track and limit coupon usage per user
2. **Combination Rules**: Allow/prevent combining multiple coupons
3. **Category Restrictions**: Limit coupons to specific product categories
4. **Geographic Restrictions**: Limit coupons by user location
5. **A/B Testing**: Test different coupon strategies
6. **Analytics**: Track coupon performance and conversion rates

## Testing

The system includes comprehensive validation that should be tested:
1. **Valid coupon codes** with different formats
2. **Invalid coupon codes** (too short, too long, invalid characters)
3. **Expired coupons**
4. **Minimum purchase requirements**
5. **Cart total changes** after coupon application
6. **Network errors** and API failures
7. **Edge cases** (empty cart, negative amounts, etc.)