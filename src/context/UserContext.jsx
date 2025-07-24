import { create } from "zustand";
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await UserService.getAllUsers();
      if (response?.users) {
        set({ users: response.users });
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
