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
      }}
    />
  );
};

export default ToastContainer;
