import { create } from "zustand";
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const useSupplierStore = create((set) => ({
  suppliers: [],
  loading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ loading: true });
    try {
      const response = await SupplierService.getAllSuppliers();
      if (response?.suppliers) {
        set({ suppliers: response.suppliers });
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
