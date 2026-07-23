import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import authReducer from "./features/authSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
