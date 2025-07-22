import { useEffect, useState } from "react";
import "@/styles/list.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProductsService from "@/services/products/ProductService";
import ToastService from "@/services/toast/ToastService";
import CreateProductDialog from "@/components/products/CreateProductDialog";
import UpdateProductDialog from "@/components/products/UpdateProductDialog";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los productos al montar el componente
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductsService.getAllProducts();
      // Verificar si response.products existe
      if (response?.products) {
        setProducts(response.products);
      } else {
        console.error("Formato de respuesta inesperado:  ", response);
        setError("Formato de respuesta inesperado");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener los productos", error);
      setError(error.message || "Error al obtener productos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para eliminar un producto
  const handleDelete = async (productId) => {
    if (
      window.confirm(
        `¿Estas seguro de eliminar el producto con ID: ${productId}?`
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await ProductsService.deleteProduct(productId);
            setProducts(
              products.filter((product) => product.id_product !== productId)
            );
            return { success: true };
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Eliminando producto...",
          success: "Producto eliminado correctamente",
          error: "Error al eliminar el producto",
        }
      );
    }
  };

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Productos</h1>
        <div>
          <CreateProductDialog onProductCreated={fetchProducts} />
        </div>
      </div>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-error">{error}</p>}

      {products && products.length > 0 ? (
        <Table>
          <TableCaption style={{ marginTop: "10px" }}>
            Lista de Productos
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead className="text-center">Categoria</TableHead>
              <TableHead className="text-center">Precio</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Proveedor</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id_product || product.name}>
                <TableCell className="font-medium">
                  {product.id_product}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="font-medium">
                  {product.supplier.name || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <UpdateProductDialog
                      product={product}
                      onProductUpdated={fetchProducts}
                    />
                    <Button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id_product)}
                      disabled={loading}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        !loading && <p>No hay productos disponibles</p>
      )}
    </div>
  );
};

export default ProductList;
