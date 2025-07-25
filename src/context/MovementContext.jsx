import { create } from "zustand";
import MovementService from "@/services/movements/MovementService";
import ToastService from "@/services/toast/ToastService";

const useMovementStore = create((set) => ({
  movements: [],
  loading: false,
  error: null,

  fetchMovements: async () => {
    set({ loading: true });
    try {
      const response = await MovementService.getAllMovements;
      if (response?.movements) {
        set({ movements: response.movements });
      }
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      ToastService.error("Error al cargar movimientos");
      set({ error: error.message || "Error al obtener movimientos" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useMovementStore;
