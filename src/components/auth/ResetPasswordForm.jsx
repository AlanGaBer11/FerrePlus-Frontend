import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/auth/AuthService";
import ToastService from "@/services/toast/ToastService";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return ToastService.error("Las contraseñas no coinciden");
    }

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          await AuthService.resetPassword(
            email,
            formData.token,
            formData.newPassword
          );
          // Redirigir al login después de un reseteo exitoso
          window.location.href = "/login";
          return { success: true };
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Actualizando contraseña...",
        success: "Contraseña actualizada exitosamente",
        error: "No se pudo actualizar la contraseña",
      }
    );
  };

  return (
    <div className=" container w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Resetear Contraseña
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Código de verificación"
          value={formData.token}
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Nueva contraseña"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          required
        />
        <Input
          type="password"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Actualizando..." : "Resetear contraseña"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
