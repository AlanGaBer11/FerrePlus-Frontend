import apiClient from "@/interceptors/auth.interceptor";

const UserService = {
  /* SOLO ADMIN */
  // MÉTODO PARA OBTENER TODOS LOS USUARIOS
  async getAllUsers(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(
        `/users/getUsers?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA OBTENER UN USUARIO POR ID
  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/getUser/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA CREAR UN NUEVO USUARIO
  async createUser(userData) {
    try {
      const response = await apiClient.post("/users/createUser", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA ACTUALIZAR UN USUARIO
  async updateUser(userId, userData) {
    try {
      const response = await apiClient.patch(
        `/users/updateUser/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA BORRAR UN USUARIO
  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`/users/deleteUser/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA DESACTIVAR UNA CUENTA
  async deactivateUser(id) {
    try {
      const response = await apiClient.patch(`/users/deactivateUser/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  // MÉTODO PARA DESACTIVAR UNA CUENTA
  async reactivateUser(id) {
    try {
      const response = await apiClient.patch(`/users/reactivateUser/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MANEJO UNIFORME DE ERRORES
  handleError(error) {
    let errorMessage = "Error desconocido";
    let errorStatus = null;

    if (error.response) {
      // El servidor respondió con un código de estado de error
      console.error("Error de respuesta:", error.response.data);
      errorMessage = error.response.data.message || "Error en el servidor";
      errorStatus = error.response.status;
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error("Error de solicitud:", error.request);
      errorMessage = "No se pudo conectar con el servidor";
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error("Error:", error.message);
      errorMessage = error.message;
    }

    // Crear y lanzar un nuevo error con el mensaje apropiado
    const newError = new Error(errorMessage);
    if (errorStatus) {
      newError.status = errorStatus;
    }

    return newError; // Retorna el error para que sea lanzado con throw
  },
};

export default UserService;
