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
        // Agregar botón de cierre por defecto
        dismissible: true,
        closeButton: true,
        closeButtonStyle: {
          color: "var(--color-text)",
          opacity: 0.7,
        },
      }}
    />
  );
};

export default ToastContainer;
