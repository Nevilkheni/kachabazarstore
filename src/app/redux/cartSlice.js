import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const quantityToAdd = item.quantity || 1;
      const existingItem = state.items.find((i) => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({ ...item, quantity: quantityToAdd });
      }

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => {
        const price = typeof i.price === "string" ? parseFloat(i.price.replace("$", "")) : i.price;
        return sum + price * i.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find((i) => i.name === name);

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.name !== name);
      }

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity,
        0
      );
    },

    deleteFromCart: (state, action) => {

      const name = action.payload;
      state.items = state.items.filter((i) => i.name !== name);
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },

},
);

export const { addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


