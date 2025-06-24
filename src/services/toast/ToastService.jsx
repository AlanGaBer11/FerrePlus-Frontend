// Servicio para manejar notificaciones toast en toda la aplicación
import toast from "react-hot-toast";

// Objeto con funciones para mostrar diferentes tipos de toasts
const ToastService = {
  // Toast básico
  show: (message) => toast(message),

  // Toast de éxito
  success: (message) => toast.success(message),

  // Toast de error
  error: (message) => toast.error(message),

  // Toast de carga
  loading: (message) => toast.loading(message),

  // Toast personalizado
  custom: (message, options) => toast(message, options),

  // Método para mostrar un toast de promesa
  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Cargando...",
      success: messages.success || "¡Completado con éxito!",
      error: messages.error || "Ha ocurrido un error",
    });
  },

  // Método para descartar todos los toasts
  dismiss: () => toast.dismiss(),
};

export default ToastService;
