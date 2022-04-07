import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: null,
    total: null,
  },
  reducers: {
    productAdded: (state, action) => {
      const item = action.payload;
      const itemIndex = state.products.findIndex((i) => i._id === item._id);
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
        toast.info("Product Quantity Increased", {
          position: "bottom-left",
        });
      } else {
        state.products.push(item);
        toast.success(`${item.title} Added To Cart`, {
          position: "bottom-left",
        });
      }
      state.quantity += state.products.length;
      state.total += action.payload.price * action.payload.quantity;
    },
    productDeleted: (state, action) => {
      state.products = state.products.filter(
        (p) => action.payload.id !== p._id
      );
      state.quantity = state.products.length;
      toast.warning(`Item removed`, {
        position: "bottom-left",
      });
    },
    increaseQty: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    getTotal: (state) => {
      const { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const {
  productAdded,
  productDeleted,
  increaseQty,
  decreaseQty,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
