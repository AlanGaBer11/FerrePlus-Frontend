import { create } from "zustand";
import MovementService from "@/services/movements/MovementService";
import ToastService from "@/services/toast/ToastService";

const useMovementStore = create((set) => ({
  movements: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalMovements: 0,
  movementsPerPage: 10,

  // Función para obtener todos los movimientos
  fetchAllMovements: async () => {
    set({ loading: true });
    try {
      // Primero obtenemos el total de movimientos
      const initialResponse = await MovementService.getAllMovements(1, 1);
      if (initialResponse?.pagination?.totalMovements) {
        // Obtenemos todos los movimientos en una sola llamada
        const response = await MovementService.getAllMovements(
          1,
          initialResponse.pagination.totalMovements
        );
        if (response?.movements) {
          set({
            movements: response.movements,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      ToastService.error("Error al cargar movimientos");
      set({ error: error.message || "Error al obtener movimientos" });
    } finally {
      set({ loading: false });
    }
  },

  // Función para obtener movimientos paginados
  fetchMovements: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await MovementService.getAllMovements(page, limit);
      if (response?.movements && response?.pagination) {
        set({
          movements: response.movements,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalMovements: response.pagination.totalMovements,
          movementsPerPage: response.pagination.movementsPerPage,
          error: null,
        });
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
