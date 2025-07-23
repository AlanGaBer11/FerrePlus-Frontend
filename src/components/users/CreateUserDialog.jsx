import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
/* Servicios */
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";

const CreateUserDialog = ({ onUserCreated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  async function submitForm(event) {
    event.preventDefault();
    // Validaciones básicas
    if (!data.name || !data.email || !data.password || !data.role) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }

    // Preparar datos para su envío
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          const response = await UserService.createUser(userData);
          setOpen(false); // Cerrar el diálogo
          resetForm(); // Limpiar el formulario

          if (onUserCreated) {
            onUserCreated();
          }

          return response;
        } catch (error) {
          console.error("Error al crear el usuario:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      // MENSAJES
      {
        loading: "Creando usuario...",
        success: "Usuario creado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo crear el usuario"}`,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="create-btn">
          Crear Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="pt-7">
          <DialogTitle style={{ marginTop: "10px", textAlign: "center" }}>
            Crear Usuario
          </DialogTitle>
        </DialogHeader>
        {/* FORMULARIO PARA CREAR UN USUARIO */}
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Nombre Completo</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Correo Electrónico</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <div className="form-group">
              <select
                name="role"
                id="role"
                value={data.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <label htmlFor="role">Rol</label>
            </div>
          </form>
        </div>
        {/* FIN DEL FORMULARIO */}
        <DialogFooter className="m-1.5 p-2 rounded-lg">
          <DialogClose asChild>
            <Button className="cancel-btn">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={submitForm}
            disabled={loading}
            style={{ marginRight: "22px" }}
          >
            {loading ? "Creando..." : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
CreateUserDialog.propTypes = {
  onUserCreated: PropTypes.func,
};

export default CreateUserDialog;
