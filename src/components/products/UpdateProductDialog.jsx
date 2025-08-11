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
import ProductService from "@/services/products/ProductService";
import useSupplierStore from "@/context/SupplierContext";
import ToastService from "@/services/toast/ToastService";

const UpdateProductDialog = ({ product, onProductUpdated }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    supplier_name: "",
  });

  useEffect(() => {
    if (open && product) {
      setData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        supplier_name: product.supplier?.name || "",
      });
    }
  }, [open, product]);

  const {
    suppliers,
    loading: suppliersLoading,
    fetchAllSuppliers,
  } = useSupplierStore();

  useEffect(() => {
    if (open) {
      fetchAllSuppliers();
    }
  }, [open, fetchAllSuppliers]);

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
      !data.name ||
      !data.category ||
      !data.price ||
      !data.stock ||
      !data.supplier_name
    ) {
      ToastService.error("Por favor completa todos los campos");
      return;
    }
    // Preparar datos para su envío
    const productData = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      ...(data.supplier_name && { supplier_name: data.supplier_name }), // Solo incluir supplier_name si no está vacío
    };

    ToastService.promise(
      (async () => {
        setLoading(true);
        try {
          // Llamamos al servicio para actualizar el producto
          const response = await ProductService.updateProduct(
            product.id_product,
            productData
          );
          setOpen(false);

          // Notificar al componente padre para actualizar la lista
          if (onProductUpdated) {
            onProductUpdated();
          }
          return response;
        } catch (error) {
          console.error("Error al actualizar el producto: ", error);
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      // Mensajes de Toast
      {
        loading: "Actualizando producto...",
        success: "Producto asctualizado exitosamente",
        error: (err) =>
          `Error: ${err.message || "No se pudo actualizar el producto"}`,
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
            Actualizar Producto
          </DialogTitle>
        </DialogHeader>
        {/* Formulario para actualizar un producto */}
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="update-name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-name">Nombre del Producto</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="update-category"
                name="category"
                value={data.category}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-category">Categoría</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="update-price"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-price">Precio</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="update-stock"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder=""
                required
              />
              <label htmlFor="update-stock">Cantidad disponible </label>
            </div>
            <div className="form-group">
              <select
                id="update-supplier_name"
                name="supplier_name"
                value={data.supplier_name}
                onChange={handleChange}
                required
                disabled={suppliersLoading}
              >
                <option value="">Seleccione un proveedor</option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.id_supplier}
                    value={supplier.supplier_name}
                  >
                    {supplier.name}
                  </option>
                ))}
              </select>
              <label htmlFor="update-supplier_name">
                Proveedor (ID actual: {product?.supplier?.id_supplier} -{" "}
                {product?.supplier?.name})
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
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

UpdateProductDialog.propTypes = {
  product: PropTypes.shape({
    id_product: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    supplier: PropTypes.shape({
      id_supplier: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  onProductUpdated: PropTypes.func,
};

export default UpdateProductDialog;
