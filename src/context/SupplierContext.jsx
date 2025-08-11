import { create } from "zustand";
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const useSupplierStore = create((set) => ({
  suppliers: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalSuppliers: 0,
  suppliersPerPage: 10,

  // Función para obtener todos los proveedores
  fetchAllSuppliers: async () => {
    set({ loading: true });
    try {
      // Primero obtenemos el total de proveedores
      const initialResponse = await SupplierService.getAllSuppliers(1, 1);
      if (initialResponse?.pagination?.totalSuppliers) {
        // Obtenemos todos los proveedores en una sola llamada
        const response = await SupplierService.getAllSuppliers(
          1,
          initialResponse.pagination.totalSuppliers
        );
        if (response?.suppliers) {
          set({
            suppliers: response.suppliers,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
      ToastService.error("Error al cargar proveedores");
      set({ error: error.message || "Error al obtener proveedores" });
    } finally {
      set({ loading: false });
    }
  },

  // Función para obtener proveedores paginados
  fetchSuppliers: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await SupplierService.getAllSuppliers(page, limit);
      if (response?.suppliers && response?.pagination) {
        set({
          suppliers: response.suppliers,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalSuppliers: response.pagination.totalSuppliers,
          suppliersPerPage: response.pagination.suppliersPerPage,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
      ToastService.error("Error al cargar proveedores");
      set({ error: error.message || "Error al obtener proveedores" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSupplierStore;
