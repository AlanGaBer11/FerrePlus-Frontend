import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/auth/AuthService";
import ToastService from "@/services/toast/ToastService";

const VerifiAccount = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    ToastService.promise(
      (async () => {
        try {
          await AuthService.verifyAccount(email, token);
          // Redirigir al login después de una verificación exitosa
          window.location.href = "/login";
          return { success: true };
        } catch (error) {
          ToastService.error("No se pudo verificar la cuenta");
        }
      })(),
      {
        loading: "Verificando cuenta...",
        success: "Cuenta verificada exitosamente",
        error: "No se pudo verificar la cuenta",
      }
    );
  };

  return (
    <div className="container w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Verificar Cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Código de verificación"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Verificar cuenta
        </Button>
      </form>
    </div>
  );
};

export default VerifiAccount;
