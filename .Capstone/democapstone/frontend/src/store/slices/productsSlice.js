import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await api.get("/products");
  return data;
});

export const createProduct = createAsyncThunk("products/create", async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, changes }) => {
  await api.put(`/products/${id}`, changes);
  return { id, changes };
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

const slice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = "loading"; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })
      .addCase(createProduct.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(updateProduct.fulfilled, (s, a) => {
        const idx = s.items.findIndex(p => p.id === a.payload.id);
        if (idx > -1) s.items[idx] = { ...s.items[idx], ...a.payload.changes };
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.items = s.items.filter(p => p.id !== a.payload);
      });
  }
});

export default slice.reducer;
