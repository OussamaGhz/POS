import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  name: string;
  selling_price: number;
  family_cost: number;
  amount: number;
  total: number;
};

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.amount += action.payload.amount;
        existingProduct.total +=
          action.payload.amount *
          (action.payload.selling_price + action.payload.family_cost);
      } else {
        state.products.push({
          ...action.payload,
          total:
            action.payload.amount *
            (action.payload.selling_price + action.payload.family_cost),
        });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.amount += 1;
        product.total += product.selling_price + product.family_cost;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        if (product.amount > 1) {
          product.amount -= 1;
          product.total -= product.selling_price + product.family_cost;
        } else {
          state.products.splice(productIndex, 1);
        }
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
