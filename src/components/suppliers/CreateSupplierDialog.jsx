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
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const CreateSupplierDialog = ({ onSupplierCreated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
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
      phone: "",
      address: "",
      email: "",
    });
  };

  async function submitForm(event) {
    event.preventDefault();

    if (!data.name || !data.phone || !data.address || !data.email) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }

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
          const response = await SupplierService.createSupplier(supplierData);
          setOpen(false);
          resetForm();
          onSupplierCreated?.();
          return response;
        } catch (error) {
          console.error("Error al crear proveedor:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Creando proveedor...",
        success: "Proveedor creado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo crear el proveedor"}`,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="create-btn">
          Crear Proveedor
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="p-7">
          <DialogTitle style={{ marginTop: "10px", textAlign: "center" }}>
            Crear Proveedor
          </DialogTitle>
        </DialogHeader>

        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Correo Electrónico</label>
            </div>
          </form>
        </div>

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

CreateSupplierDialog.propTypes = {
  onSupplierCreated: PropTypes.func,
};

export default CreateSupplierDialog;
