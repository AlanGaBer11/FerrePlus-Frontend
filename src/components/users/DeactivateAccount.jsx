import React, { useState } from "react";
import { Button } from "../ui/button";
import { Ban } from "lucide-react";
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";
import { useAuth } from "@/context/AuthContext"; // Importa el hook

const DeactivateAccount = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Obtén el usuario autenticado

  const handleDeactivate = (userId) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas desactivar tu cuenta? Para reactivarla te tendrás que poner en contacto con el soporte."
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await UserService.deactivateUser(userId);
            return { success: true };
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Desactivando cuenta...",
          success: "Cuenta desactivada correctamente",
          error: "No se pudo desactivar la cuenta",
        }
      );
    }
  };

  return (
    <div>
      <Button
        className="delete-btn"
        onClick={() => handleDeactivate(user?.id_user)}
        disabled={loading}
      >
        <Ban />
        Desactivar Cuenta
      </Button>
    </div>
  );
};

export default DeactivateAccount;
