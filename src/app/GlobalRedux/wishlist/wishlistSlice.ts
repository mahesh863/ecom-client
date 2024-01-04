'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface WishlistItems {
  id: number;
  quantity: number;
}

export interface CounterState {
  wishlist: WishlistItems[];
}

const initialState: CounterState = {
  wishlist: [],
};

export const WishlistSlice = createSlice({
  name: 'Wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      console.log(action.payload);
      const removed = state.wishlist.filter(
        (item) => item.id != action.payload.id
      );
      state.wishlist = removed;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
