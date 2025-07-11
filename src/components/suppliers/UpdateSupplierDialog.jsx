import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const UpdateSupplierDialog = ({ supplier, onSupplierUpdated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (open && supplier) {
      setData({
        name: supplier.name || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        email: supplier.email || "",
      });
    }
  }, [open, supplier]);

  const handleUpdate = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function submitForm(event) {
    event.preventDefault();

    // Validaciones básicas
    if (!data.name || !data.phone || !data.address || !data.email) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }
    // Preparamos los datos para su envió
    const supplierData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          // Llamamos a la API
          const response = await SupplierService.updateSupplier(
            supplier.id_supplier,
            supplierData
          );
          setOpen(false); // Cerramos el dialogo

          // Notificamos al componente padre para actualizarlo
          if (onSupplierUpdated) {
            onSupplierUpdated();
          }

          return response;
        } catch (error) {
          console.error("Error al actualizar el proveedor: ", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      // Mensajes
      {
        loading: "Actualizando proveedor...",
        success: "Proveedor actualizado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo actualizar el proveedor"}`,
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
            Actualizar Provedor
          </DialogTitle>
        </DialogHeader>
        {/* Formulario para actualizar un proveedor */}
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                placeholder=""
                onChange={handleUpdate}
                required
              />
              <label htmlFor="name">Nombre del proveedor</label>
            </div>
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={data.phone}
                placeholder=""
                onChange={handleUpdate}
                required
              />
              <label htmlFor="phone">Teléfono</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={data.address}
                placeholder=""
                onChange={handleUpdate}
                required
              />
              <label htmlFor="address">Dirección</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                placeholder=""
                onChange={handleUpdate}
                required
              />
              <label htmlFor="email">Correo Electrónico</label>
            </div>
          </form>
        </div>
        {/* Fin del formulario */}
        <DialogFooter className=" m-1.5 p-2 rounded-lg">
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
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

UpdateSupplierDialog.propTypes = {
  supplier: PropTypes.shape({
    id_supplier: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onSupplierUpdated: PropTypes.func,
};

export default UpdateSupplierDialog;
