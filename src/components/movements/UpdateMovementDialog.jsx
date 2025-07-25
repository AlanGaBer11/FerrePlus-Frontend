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
import useProductStore from "@/context/ProductContext";
import useUserStore from "@/context/UserContext";
import MovementService from "@/services/movements/MovementService";

const UpdateMovementDialog = ({ movement, onMovementUpdated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    type: "",
    quantity: "",
    date: "",
    comments: "",
    product_name: "",
    user_name: "",
  });

  const {
    products,
    loading: productsLoading,
    fetchProducts,
  } = useProductStore();

  const { users, loading: usersLoading, fetchUsers } = useUserStore();
  useEffect(() => {
    if (open) {
      fetchProducts();
      fetchUsers();
    }
  }, [open, fetchProducts, fetchUsers]);

  useEffect(() => {
    if (open && movement) {
      setData({
        type: movement.type || "",
        quantity: movement.quantity || "",
        date: movement.date || "",
        comments: movement.comments || "",
        product_name: movement.product?.name || "",
        user_name: movement.user?.name || "",
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
      !data.product_name ||
      !data.user_name
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
      product_name: data.product_name,
      user_name: data.user_name,
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
              <select
                id="update-product_name"
                name="product_name"
                value={data.product_name}
                onChange={handleChange}
                required
                disabled={productsLoading}
              >
                <option value="">Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product.id_product} value={product.product_name}>
                    {product.name}
                  </option>
                ))}
              </select>
              <label htmlFor="update-product_name">
                Producto (ID actual: {movement?.product?.id_product} -{" "}
                {movement?.product?.name})
              </label>
            </div>
            <div className="form-group">
              <select
                id="update-user_name"
                name="user_name"
                value={data.user_name}
                onChange={handleChange}
                required
                disabled={usersLoading}
              >
                <option value="">Seleccione un usuario</option>
                {users.map((user) => (
                  <option key={user.id_user} value={user.user_name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <label htmlFor="update-user_name">
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
