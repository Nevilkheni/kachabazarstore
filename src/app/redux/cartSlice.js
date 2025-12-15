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
      const existingItem = state.items.find((i) => i.name === item.name);

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
  },

},
);

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;


