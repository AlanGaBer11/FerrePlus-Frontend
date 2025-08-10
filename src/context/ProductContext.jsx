import { create } from "zustand";
import ProductService from "@/services/products/ProductService";
import ToastService from "@/services/toast/ToastService";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  productsPerPage: 10,

  fetchProducts: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await ProductService.getAllProducts(page, limit);
      if (response?.products && response?.pagination) {
        set({
          products: response.products,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalProducts: response.pagination.totalProducts,
          productsPerPage: response.pagination.productsPerPage,
          error: null,
        });
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
