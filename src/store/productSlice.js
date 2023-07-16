import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusCode from "../utils/statusCode";

// Create manual thunk
// export function getProduct() {
//   return async function productThunk(dispatch, getState) {
//     await fetch("https://fakestoreapi.com/products")
//       .then((data) => data.json())
//       .then((res) => dispatch(fetchProduct(res)));
//   };
// }

// Create thunk with createAsyncThunk
export const getProduct = createAsyncThunk('product/get', async() => {
    const data = await fetch("https://fakestoreapi.com/products")
    const result = await data.json();
    return result;
})

const initialState = {
  data: [],
  status: statusCode.IDLE
};

const productSlice = createSlice({
  name: "products",
  initialState,
//   If manual thunk use reducer
//   reducers: {
//     fetchProduct(state, action) {
//       state.data = action.payload;
//     },
//   },

// If createAsycnThunk use extraReducer
extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = statusCode.IDLE
    })
    builder.addCase(getProduct.pending, (state, action) => {
        state.status = statusCode.LOADING
    })
    builder.addCase(getProduct.rejected, (state, action) => {
        state.status = statusCode.ERROR
    })
}
});

export const { fetchProduct } = productSlice.actions;
export default productSlice.reducer;
