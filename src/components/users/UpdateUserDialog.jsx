import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
/* Servicios */
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";

const UpdateUserDialog = ({ user, onUserUpdated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (open && user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        password: "", // No prellenar la contraseña
        role: user.role || "",
      });
    }
  }, [open, user]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function submitForm(event) {
    event.preventDefault();

    // Validaciones básicas
    if (!data.name || !data.email || !data.role) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }
    // Preparar datos para su envío
    const userData = {
      name: data.name,
      email: data.email,
      role: data.role,
      ...(data.password && { password: data.password }), // Solo incluir password si no está vacío
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          // Llamar a la API para actualizar el usuario
          const response = await UserService.updateUser(user.id_user, userData);
          setOpen(false); // Cerrar el diálogo

          // Notificar al componente padre para actualizar la lista
          if (onUserUpdated) {
            onUserUpdated();
          }

          return response;
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      // MENSAJES
      {
        loading: "Actualizando usuario...",
        success: "Usuario actualizado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo actualizar el usuario"}`,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="edit-btn">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="pt-7">
          <DialogTitle style={{ marginTop: "10px" }}>
            Actualizar Usuario
          </DialogTitle>
        </DialogHeader>

        {/* FORMULARIO PARA ACTUALIZAR USUARIO */}
        <div>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <input
                type="text"
                id="update-name"
                name="name"
                value={data.name}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="update-name">Nombre Completo</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="update-email"
                name="email"
                value={data.email}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="update-email">Correo Electrónico</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="update-password"
                name="password"
                value={data.password}
                placeholder=""
                onChange={handleChange}
              />
              <label htmlFor="update-password">
                Nueva Contraseña (opcional)
              </label>
            </div>

            <div className="form-group">
              <select
                name="role"
                id="update-role"
                value={data.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <label htmlFor="update-role">Rol</label>
            </div>

            {data.password && (
              <div className="password-requirements text-sm text-gray-500 mb-4">
                <p>La contraseña debe tener:</p>
                <ul className="list-disc ml-5">
                  <li>Al menos 8 caracteres</li>
                  <li>Al menos una letra mayúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un carácter especial</li>
                </ul>
              </div>
            )}
          </form>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <DialogFooter className="m-1.5 p-2 rounded-lg">
          <DialogClose asChild>
            <Button type="button" className="cancel-btn">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={submitForm}
            disabled={loading}
            style={{ marginRight: "22px" }}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

UpdateUserDialog.propTypes = {
  user: PropTypes.shape({
    id_user: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    verified: PropTypes.bool,
  }).isRequired,
  onUserUpdated: PropTypes.func,
};

export default UpdateUserDialog;
