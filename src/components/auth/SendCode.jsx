import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AuthService from "@/services/auth/AuthService";
import ToastService from "@/services/toast/ToastService";

const SendCode = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    ToastService.promise(
      (async () => {
        try {
          setLoading(true);
          await AuthService.sendCode(email);
          // Redirigir al formulario de verificación
          window.location.href = `/verify-account?email=${email}`;
          return { success: true };
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Enviando código de verificación...",
        success: "Se ha enviado un código a tu correo",
        error: "No se pudo enviar el código de verificación",
      }
    );
  };

  return (
    <div className=" container w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Enviar Código de Verificación
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
            {loading ? "Enviando..." : "Enviar código de verificación"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendCode;
