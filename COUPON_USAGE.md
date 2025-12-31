# Coupon System Usage

The coupon system is now globally available across all pages with automatic persistence and synchronization.

## Features

- **Global State**: Coupons applied on any page automatically show on all other pages
- **Persistence**: Coupons persist after page reload using localStorage
- **Auto-sync**: When a coupon is applied/removed on one page, all other pages update automatically
- **Validation**: Coupons are automatically validated when cart total changes

## Components Available

### 1. CouponApply
Full coupon input and application component
```jsx
import CouponApply from "@/components/coupon/CouponApply";

<CouponApply 
  totalAmount={totalAmount}
  className="mt-4"
/>
```

### 2. CouponDisplay
Simple display component showing applied coupon
```jsx
import CouponDisplay from "@/components/coupon/CouponDisplay";

<CouponDisplay className="mb-4" />
```

### 3. useCouponContext Hook
Direct access to coupon state and functions
```jsx
import { useCouponContext } from "@/contexts/CouponContext";

const { 
  appliedCoupon, 
  couponDiscount, 
  applyCoupon, 
  removeCoupon 
} = useCouponContext();
```

## Adding to Any Page

To add coupon functionality to any page:

1. **For full coupon input**: Add `<CouponApply totalAmount={amount} />`
2. **For display only**: Add `<CouponDisplay />`
3. **For custom logic**: Use `useCouponContext()` hook

## Example Usage

```jsx
"use client";
import { useCouponContext } from "@/contexts/CouponContext";
import CouponApply from "@/components/coupon/CouponApply";

export default function MyPage() {
  const { appliedCoupon, couponDiscount } = useCouponContext();
  const totalAmount = 100; // Your cart total

  return (
    <div>
      <h1>My Page</h1>
      
      {/* Show coupon input */}
      <CouponApply totalAmount={totalAmount} />
      
      {/* Show total with discount */}
      <div className="mt-4">
        <p>Subtotal: ${totalAmount}</p>
        {appliedCoupon && (
          <p>Discount: -${couponDiscount}</p>
        )}
        <p>Total: ${totalAmount - couponDiscount}</p>
      </div>
    </div>
  );
}
```

## Current Implementation

The coupon system is already integrated into:
- Order Summary page (`/checkout-cart/ordersummary`)
- Checkout page (`/checkout-cart/checkout`)

Both pages now share the same coupon state and automatically sync when coupons are applied or removed.