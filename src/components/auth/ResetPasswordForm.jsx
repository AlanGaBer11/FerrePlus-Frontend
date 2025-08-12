import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth/AuthService";
import ToastService from "@/services/toast/ToastService";
import PasswordChecklist from "react-password-checklist";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  // Estados separados para la visibilidad de cada contraseña
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Funciones separadas para togglear la visibilidad de cada contraseña
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
    <div className="container w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Resetear Contraseña
      </h2>
      <form className="space-y-4">
        <Input
          type="text"
          placeholder="Código de verificación"
          value={formData.token}
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
          required
          className="w-full"
        />
        <div className="relative w-full">
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            required
            className="w-full"
          />
          <span className="toggle-password" onClick={toggleNewPassword}>
            {showNewPassword ? (
              <i className="fi fi-rs-crossed-eye eye"></i>
            ) : (
              <i className="fi fi-rs-eye eye"></i>
            )}
          </span>
        </div>
        <div className="relative w-full">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className="w-full"
          />
          <span className="toggle-password" onClick={toggleConfirmPassword}>
            {showConfirmPassword ? (
              <i className="fi fi-rs-crossed-eye eye"></i>
            ) : (
              <i className="fi fi-rs-eye eye"></i>
            )}
          </span>
        </div>
        {/* CHECK PASSWORD */}
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={formData.newPassword}
          valueAgain={formData.confirmPassword}
          messages={{
            minLength: "La contraseña tiene más de 8 caracteres.",
            specialChar: "La contraseña tiene caracteres especiales.",
            number: "La contraseña tiene un número.",
            capital: "La contraseña tiene una letra mayúscula.",
            match: "Las contraseñas coinciden.",
          }}
        />
      </form>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar Contraseña"}
      </Button>
    </div>
  );
};
export default ResetPasswordForm;
