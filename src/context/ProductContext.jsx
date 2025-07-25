import { create } from "zustand";
import ProductService from "@/services/products/ProductService";
import ToastService from "@/services/toast/ToastService";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await ProductService.getAllProducts();
      if (response?.products) {
        set({ products: response.products });
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      ToastService.error("Error al cargar productos");
      set({ error: error.message || "Error al obtener productos" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
