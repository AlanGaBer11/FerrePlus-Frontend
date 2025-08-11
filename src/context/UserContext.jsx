import { create } from "zustand";
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  usersPerPage: 10,

  // Función para obtener todos los usuarios
  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      // Primero obtenemos el total de usuarios
      const initialResponse = await UserService.getAllUsers(1, 1);
      if (initialResponse?.pagination?.totalUsers) {
        // Obtenemos todos los usuarios en una sola llamada
        const response = await UserService.getAllUsers(
          1,
          initialResponse.pagination.totalUsers
        );
        if (response?.users) {
          set({
            users: response.users,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      ToastService.error("Error al cargar usuarios");
      set({ error: error.message || "Error al obtener usuarios" });
    } finally {
      set({ loading: false });
    }
  },

  fetchUsers: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await UserService.getAllUsers(page, limit);
      if (response?.users && response?.pagination) {
        set({
          users: response.users,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalUsers: response.pagination.totalUsers,
          usersPerPage: response.pagination.usersPerPage,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      ToastService.error("Error al cargar usuarios");
      set({ error: error.message || "Errror al obtener usuarios" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
