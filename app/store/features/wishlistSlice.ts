import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  badge?: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(
        (item) => item.id.toString() === action.payload.id.toString()
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(
        (item) => item.id.toString() !== action.payload.toString()
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },

    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;