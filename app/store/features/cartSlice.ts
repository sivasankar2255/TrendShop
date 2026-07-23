



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type CartItem = {
//     id: number;
//     name: string;
//     price: number;
//     quantity: number;
// };

// type CartState = {
//     items: CartItem[];
// };

// const initialState: CartState = {
//     items: [],
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action: PayloadAction<CartItem>) => {
//             const existingItem = state.items.find(
//                 (item) => item.id === action.payload.id
//             );

//             if (existingItem) {
//                 existingItem.quantity += action.payload.quantity;
//             } else {
//                 state.items.push(action.payload);
//             }
//         },

//         increaseQuantity: (state, action: PayloadAction<number>) => {
//             const item = state.items.find(
//                 (product) => product.id === action.payload
//             );

//             if (item) {
//                 item.quantity += 1;
//             }
//         },

//         decreaseQuantity: (state, action: PayloadAction<number>) => {
//             const item = state.items.find(
//                 (product) => product.id === action.payload
//             );

//             if (item && item.quantity > 1) {
//                 item.quantity -= 1;
//             }
//         },

//         removeFromCart: (state, action: PayloadAction<number>) => {
//             state.items = state.items.filter(
//                 (item) => item.id !== action.payload
//             );
//         },

//         clearCart: (state) => {
//             state.items = [];
//         },
//     },
// });

// export const {
//     addToCart,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id.toString() === action.payload.id.toString()
      );

      const qtyToAdd = action.payload.quantity && action.payload.quantity > 0 ? action.payload.quantity : 1;

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({
          ...action.payload,
          quantity: qtyToAdd,
        });
      }
    },

    increaseQuantity: (
      state,
      action: PayloadAction<number | string>
    ) => {
      const item = state.items.find(
        (item) => item.id.toString() === action.payload.toString()
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<number | string>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id.toString() === action.payload.toString()
      );

      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number | string>
    ) => {
      state.items = state.items.filter(
        (item) => item.id.toString() !== action.payload.toString()
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;