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
import { Button } from "../ui/button";
import ProductService from "@/services/products/ProductService";
import ToastService from "@/services/toast/ToastService";

const CreateProductDialog = ({ onProductCreated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    id_supplier: "",
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
      category: "",
      price: "",
      stock: "",
    });
  };

  // Función para crear un nuevo producto
  async function submitForm(event) {
    event.preventDefault();
    // Validaciones básicas
    if (
      !data.name ||
      !data.category ||
      !data.price ||
      !data.stock ||
      !data.id_supplier
    ) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }

    // Preparamos los datos para el envío
    const productData = {
      name: data.name,
      category: data.category,
      price: data.price,
      stock: data.stock,
      id_supplier: data.id_supplier,
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          const response = await ProductService.createProduct(productData);
          setOpen(false);
          resetForm();
          if (onProductCreated) {
            onProductCreated();
          }
          return response;
        } catch (error) {
          console.error("Error al crear el producto: ", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Creando producto...",
        success: "Producto creado exitosamente",
        error: (err) => `${err.message || "Errror al crear el prouducto"}`,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="create-btn">
          Crear Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="p-7">
          <DialogTitle className="text-center">Crear Producto</DialogTitle>
        </DialogHeader>
        {/* Formulario para crear un producto */}
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="name">Nombre del Producto</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="category"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="category">Categoría</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="price"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="price">Precio</label>
            </div>
            <div className="form-group">
              <input
                type="stock"
                id="stock"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="stock">Cantidad disponible </label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="id_supplier"
                name="id_supplier"
                value={data.id_supplier}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="id_supplier">Proveedor</label>
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

CreateProductDialog.propTypes = {
  onProductCreated: PropTypes.func,
};

export default CreateProductDialog;
