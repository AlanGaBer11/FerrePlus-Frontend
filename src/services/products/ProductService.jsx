import apiClient from "@/interceptors/auth.interceptor";

const ProductService = {
  // Método para obtener todos los productos
  async getAllProducts() {
    try {
      const response = await apiClient.get("/products/getProducts");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para obtener un producto por ID
  async getProductById(productId) {
    try {
      const response = apiClient.get(`/products/getProduct/${productId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para crear un nuevo producto
  async createProduct(productData) {
    try {
      const response = await apiClient.post(
        "/products/createProduct",
        productData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para actualizar un producto
  async updateProduct(productId, productData) {
    try {
      const response = await apiClient.patch(
        `/products/updateProduct/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para eliminar un producto
  async deleteProduct(productId) {
    try {
      const response = await apiClient.delete(
        `/products/deleteProduct/${productId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Método para manejar errores
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

export default ProductService;
