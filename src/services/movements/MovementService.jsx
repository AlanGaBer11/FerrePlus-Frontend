import apiClient from "@/interceptors/auth.interceptor";

const MovementService = {
  // Método para obtener todos los movimientos
  async getAllMovements(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(
        `/movements/getMovements?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para obtener un movimiento por ID
  async getMovementById(movementId) {
    try {
      const response = await apiClient.get(
        `/movements/getMovement/${movementId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para crear un nuevo movimiento
  async createMovement(movementData) {
    try {
      const response = await apiClient.post(
        "/movements/createMovement",
        movementData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para actualizar un movimiento
  async updateMovement(movementId, movementData) {
    try {
      const response = await apiClient.patch(
        `/movements/updateMovement/${movementId}`,
        movementData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para eliminar un movimiento
  async deleteMovement(movementId) {
    try {
      const response = await apiClient.delete(
        `/movements/deleteMovement/${movementId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para manejar errores
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

export default MovementService;
