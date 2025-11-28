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
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity,
        0
      );

    },

    deleteFromCart: (state, action) => {

      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);

      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity,
        0
      );
    },
  },

},
);

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;


