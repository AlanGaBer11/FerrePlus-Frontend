import { Toaster } from "react-hot-toast";
const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Estilos por defecto para todos los toasts
        duration: 5000,
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
        },
        // Configuración específica para cada tipo de toast
        success: {
          duration: 3000,
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "white",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "var(--color-error)",
            secondary: "white",
          },
        },
      }}
    />
  );
};

export default ToastContainer;
