import apiClient from "@/interceptors/auth.interceptor";
const SupplierService = {
  // Método para obtener todos los proveedores
  async getAllSuppliers() {
    try {
      const response = await apiClient.get("/suppliers/getSuppliers");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para ohbtener un proveedor por ID
  async getSupplierById(supplierId) {
    try {
      const response = await apiClient.get(
        `/suppliers/getSupplier/${supplierId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para crear un nuevo proveedor
  async createSupplier(supplierData) {
    try {
      const response = await apiClient.post(
        "/suppliers/createSupplier",
        supplierData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para actualizar un proveedor
  async updateSupplier(supplierId, supplierData) {
    try {
      const response = await apiClient.patch(
        `/suppliers/updateSupplier/${supplierId}`,
        supplierData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para eliminar un proveedor
  async deleteSupplier(supplierId) {
    try {
      const response = await apiClient.delete(
        `/suppliers/deleteSupplier/${supplierId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para manejar los errores de manera uniforme
  handleError(error) {
    if (error.response) {
      // El servidor respondió con un código de estado de error
      console.error("Error de respuesta:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Error en el servidor",
        status: error.response.status,
      };
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error("Error de solicitud:", error.request);
      return {
        success: false,
        message: "No se pudo conectar con el servidor",
      };
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error("Error:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default SupplierService;
