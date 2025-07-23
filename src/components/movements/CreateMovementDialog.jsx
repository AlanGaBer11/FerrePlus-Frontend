import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MovementService from "@/services/movements/MovementService";
import ToastService from "@/services/toast/ToastService";

const CreateMovementDialog = ({ onMovementCreated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    type: "",
    quantity: "",
    date: "",
    comments: "",
    id_product: "",
    id_user: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setData({
      type: "",
      quantity: "",
      date: "",
      comments: "",
      id_product: "",
      id_user: "",
    });
  };

  // Función para crear un nuevo movimiento
  async function submitForm(event) {
    event.preventDefault();

    // Validaciones básicas
    if (
      !data.type ||
      !data.quantity ||
      !data.date ||
      !data.comments ||
      !data.id_product ||
      !data.id_user
    ) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }

    // Preparamos los datos para el envío
    const movementData = {
      type: data.type,
      quantity: data.quantity,
      date: data.date,
      comments: data.comments,
      id_product: data.id_product,
      id_user: data.id_user,
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          const response = await MovementService.createMovement(movementData);
          setOpen(false);
          resetForm();
          if (onMovementCreated) {
            onMovementCreated();
          }
          return response;
        } catch (error) {
          console.error("Error al crear el movimiento: ", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Creando movimiento...",
        success: "Movimiento creado exitosamente",
        error: (err) => `${err.message || "Errror al crear el movimiento"}`,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="create-btn">
          Crear Movimiento
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="p-7">
          <DialogTitle style={{ marginTop: "10px", textAlign: "center" }}>
            Crear Movimiento
          </DialogTitle>
        </DialogHeader>
        {/* Formulario para crear un movimiento */}
        <div>
          <form>
            <div className="form-group">
              <select
                name="type"
                id="type"
                value={data.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona el tipo de movimiento
                </option>
                <option value="Entrada">Entrada</option>
                <option value="Salida">Salida</option>
              </select>
              <label htmlFor="type">Tipo</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={data.quantity}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="quantity">Cantidad</label>
            </div>
            <div className="form-group">
              <input
                type="date"
                name="date"
                id="date"
                value={data.date}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="date">Fecha</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="comments"
                id="comments"
                value={data.comments}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="comments">Comentarios</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="id_product"
                name="id_product"
                value={data.id_product}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="id_product">Producto</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="id_user"
                name="id_user"
                value={data.id_user}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="id_user">Usuario</label>
            </div>
          </form>
        </div>
        {/* Fin del formulario */}
        <DialogFooter className="m-1.5 p-2 rounded-lg">
          <DialogClose asChild>
            <Button type="button" className="cancel-btn">
              Cancelar
            </Button>
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

CreateMovementDialog.propTypes = {
  onMovementCreated: PropTypes.func,
};

export default CreateMovementDialog;
