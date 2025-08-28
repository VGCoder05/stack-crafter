import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadcart: (state, action) => {
      state.carts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadcart } = cartSlice.actions;
export default cartSlice.reducer;
