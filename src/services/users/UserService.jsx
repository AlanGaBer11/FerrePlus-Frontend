import Cookies from "js-cookie";
import apiClient from "../../interceptors/auth.interceptor";

const UserService = {
  // Array para almacenar callbacks de cambio de autenticación
  authListeners: [],

  // Método para registrar un listener de cambios en el estado de autenticación
  onAuthChange(callback) {
    this.authListeners.push(callback);
    // Devolver función para eliminar el listener
    return () => {
      this.authListeners = this.authListeners.filter((cb) => cb !== callback);
    };
  },

  // Método para notificar cambios en el estado de autenticación
  notifyAuthChange() {
    this.authListeners.forEach((callback) => callback());
  },

  // MÉTODO PARA REGISTRAR UN NUEVO USUARIO
  async register(userData) {
    try {
      const response = await apiClient.post("/users/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA INICIAR SESIÓN
  async login(credentials) {
    try {
      const response = await apiClient.post("/users/login", credentials);
      // GUARDAMOS EL TOKEN Y DATOS DEL USUARIO
      if (response.data.token) {
        this.saveToken(response.data.token, response.data.user);
        this.notifyAuthChange(); // Notificar cambio de autenticación
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // GUARDAR EL TOKEN Y DATO DE DEL UUARIO EN COOKIES
  saveToken(token, userData) {
    Cookies.set("token", token, { expires: 1, path: "/" }); // EXPIRA EN 1 DIA
    if (userData) {
      Cookies.set("user", JSON.stringify(userData), { expires: 1, path: "/" });
    }
    this.notifyAuthChange(); // Notificar cambio de autenticación
  },

  // MÉTODO PARA VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
  isAuthenticated() {
    const token = Cookies.get("token");
    return !!token; // Devuelve true si hay un token, false en caso contrario
  },

  // MÉTODO PARA VERIFIACR SI EL USUARIO ES ADMINISTRADOR
  isAdmin() {
    const user = Cookies.get("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.role === "ADMIN"; // Verifica si el rol del usuario es 'admin'
    }
    return false; // Si no hay usuario, no es admin
  },

  // MÉTODO PARA CERRAR SESIÓN
  logout() {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    this.notifyAuthChange(); // Notificar cambio de autenticación
  },

  // MÉTODO PARA OBTENER EL TOKEN
  getToken() {
    return Cookies.get("token") || null;
  },

  // MÉTODO PARA OBTENER LOS DATOS DEL USUARIO
  getUserData() {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null; // Devuelve los datos del usuario o null si no hay
  },

  // MÉTODO PARA OBTENER EL NOMBRE DEL USUARIO
  getUserName() {
    const user = Cookies.get("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.name || "Usuario"; // Devuelve el nombre del usuario o 'Usuario' si no hay nombre
    }
    return "Usuario"; // Si no hay usuario, devuelve 'Usuario'
  },

  /* SOLO ADMIN */
  // MÉTODO PARA OBTENER TODOS LOS USUARIOS
  async getAllUsers() {
    try {
      const response = await apiClient.get("/users/getUsers");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA OBTENER UN USUARIO POR ID
  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MÉTODO PARA ACTUALIZAR UN USUARIO

  // MÉTODO PARA BORRAR UN USUARIO
  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // MANEJO UNIFORME DE ERRORES
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

export default UserService;
