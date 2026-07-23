import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    signup: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
