import axios from "axios";
import Cookies from "js-cookie";
import AuthService from "@/services/auth/authService";
import ToastService from "@/services/toast/ToastService";

const API_URL = import.meta.env.VITE_BASE_URL_LOCAL;

// RUTAS QUE REQUIERES AUTENTICACIÓN
const AUTH_ROUTES = [
  /* USUARIOS */
  "/users/getUsers", // ADMIN
  "/users/getUser", // ADMIN
  "/users/createUser", //ADMIN
  "/users/updateUser",
  "/users/deleteUser", // ADMIN

  /* PROVEEDORES */
  "/suppliers/getSuppliers",
  "/suppliers/getSupplier",
  "/suppliers/createSupplier", // ADMIN
  "/suppliers/updateSupplier", // ADMIN
  "/suppliers/deleteSupplier", // ADMIN

  /* PRODUCTOS */
  "/products/getProducts",
  "/products/getProduct",
  "/products/createProduct", // ADMIN
  "/products/updateProduct", // ADMIN
  "/products/deleteProduct", // ADMIN

  /* MOVIMIENTOS */
  "/movements/getMovements",
  "/movements/getMovement",
  "/movements/createMovement", // ADMIN
  "/movements/updateMovement", // ADMIN
  "/movements/deleteMovement", // ADMIN
];

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// INTERCEPTOR PARA AGREGAR EL TOKEN A LAS SOLICITUDES
apiClient.interceptors.request.use(
  function (config) {
    const token = AuthService.getToken();
    // VERIFICAR SI LA RUTA REQUIERE AUTENTICACIÓN
    const requireAuth = AUTH_ROUTES.some((path) => config.url.includes(path));

    if (token && requireAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Manejo de errores en la solicitud
    ToastService.error("Error en la solicitud: " + error.message);
    return Promise.reject(error);
  }
);

// INTERCEPOR PARA MANEJAR RESPUESTAS Y ERRORES
apiClient.interceptors.response.use(
  function (response) {
    // SI LA RESPUESTA ES EXITOSA, RETORNARLA
    return response;
  },
  function (error) {
    if (error.response) {
      // Si la respuesta del servidor indica un error de autenticación
      if (error.response.status === 401 || error.response.status === 403) {
        // Eliminar token y datos de usuario
        Cookies.remove("token", { path: "/" });
        Cookies.remove("userData", { path: "/" });

        // Redirigir al login (usamos window.location ya que no podemos usar navigate)
        window.location.href = "/login";

        // Opcionalmente, mostrar mensaje (si tienes un sistema de notificaciones global)
        if (window.ToastService) {
          window.ToastService.error(
            "No autorizado. Por favor, inicia sesión nuevamente."
          );
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
