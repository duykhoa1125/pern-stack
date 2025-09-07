import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:3001" : ""; 

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // For future use with product forms (add/edit)
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      document.getElementById("add_product_modal")?.close();
      toast.success("Product added");
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.response?.status === 429)
        set({
          error: "Too many requests, please try again later.",
          products: [],
        });
      else
        set({
          error: "An error occurred while fetching products.",
          products: [],
        });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) =>{
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null
      })
    } catch (error) {
      console.log("Error fetching product:", error);
      set({error: "Failed to fetch product", currentProduct: null});
      toast.error("Failed to fetch product");
    } finally{
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      await get().fetchProducts();
      toast.success("Product updated");
      get().resetFormData();

    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Failed to update product");
    } finally{
      set({ loading: false });
    }
  }

}));
