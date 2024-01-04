'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface CartItems {
  id: number;
  quantity: number;
}

export interface CounterState {
  cart: CartItems[];
}

const initialState: CounterState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      const removed = state.cart.filter((item) => item.id != action.payload.id);
      state.cart = removed;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
