import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ToastService from "@/services/toast/ToastService";
import MovementService from "@/services/movements/MovementService";

const UpdateMovementDialog = ({ movement, onMovementUpdated }) => {
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

  useEffect(() => {
    if (open && movement) {
      setData({
        type: movement.type || "",
        quantity: movement.quantity || "",
        date: movement.date || "",
        comments: movement.comments || "",
        id_product: movement.product?.id_product || "",
        id_user: movement.user?.id_user || "",
      });
    }
  }, [open, movement]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function submitForm(event) {
    event.preventDefault();

    //Validaciones básicas
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
    // Preparar datos para su envío
    const movementData = {
      type: data.type,
      quantity: parseInt(data.quantity, 10),
      date: data.date,
      comments: data.comments,
      id_product: data.id_product,
      id_user: data.id_user,
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          // Llamamos al servicio para actualizar el movimiento
          const response = await MovementService.updateMovement(
            movement.id_movement,
            movementData
          );
          setOpen(false);

          // Notificar al componente padre para actualizar la lista
          if (onMovementUpdated) {
            onMovementUpdated();
          }
          return response;
        } catch (error) {
          console.error("Error al actualizar el movimiento: ", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      // Mensajes de Toast
      {
        loading: "Actualizando movimiento...",
        success: "Movimiento actualizado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo actualizar el movimiento"}`,
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
        <DialogHeader className="p-7">
          <DialogTitle style={{ marginTop: "10px", textAlign: "center" }}>
            Actualizar Movimiento
          </DialogTitle>
        </DialogHeader>
        {/* Formulario para crear un movimiento */}
        <div>
          <form>
            <div className="form-group">
              <select
                name="type"
                id="update-type"
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
              <label htmlFor="update-type">Tipo</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="quantity"
                id="update-quantity"
                value={data.quantity}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-quantity">Cantidad</label>
            </div>
            <div className="form-group">
              <input
                type="date"
                name="date"
                id="update-date"
                value={data.date}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-date">Fecha</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="comments"
                id="update-comments"
                value={data.comments}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-comments">Comentarios</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="update-id_product"
                name="id_product"
                value={data.id_product}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-id_product">
                Producto (ID actual: {movement?.product?.id_product} -{" "}
                {movement?.product?.name})
              </label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="update-id_user"
                name="id_user"
                value={data.id_user}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-id_user">
                Usuario (ID actual: {movement?.user?.id_user} -{" "}
                {movement?.user?.name})
              </label>
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
            {loading ? "Acctualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

UpdateMovementDialog.propTypes = {
  movement: PropTypes.shape({
    id_movement: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comments: PropTypes.string,
    product: PropTypes.shape({
      id_product: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
      id_user: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  onMovementUpdated: PropTypes.func,
};

export default UpdateMovementDialog;
