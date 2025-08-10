import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/auth/AuthService";
import ToastService from "@/services/toast/ToastService";

const RequestResetForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          await AuthService.requestPasswordReset(email);
          // Redirigir al formulario de reseteo
          window.location.href = `/reset-password?email=${email}`;
          return { success: true };
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Enviando código de recuperación...",
        success: "Se ha enviado un código a tu correo",
        error: "No se pudo enviar el código de recuperación",
      }
    );
  };

  return (
    <div className=" container w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Recuperar Contraseña
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            style={{ margin: "1rem" }}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            style={{ margin: "1rem" }}
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar código de recuperación"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestResetForm;
