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
import CreateProductDialog from "@/components/products/CreateProductDialog";
import UpdateProductDialog from "@/components/products/UpdateProductDialog";
import Pagination from "@/components/Pagination";
import ProductsService from "@/services/products/ProductService";
import ToastService from "@/services/toast/ToastService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);

  // Cargar los productos al montar el componente
  const fetchProducts = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await ProductsService.getAllProducts(page, limit);
      // Verificar si response.products existe
      if (response?.products && response?.pagination) {
        setProducts(response.products);
        setCurrentPage(response.pagination.currentPage);
        setTotalProducts(response.pagination.totalProducts);
        setTotalPages(response.pagination.totalPages);
        setProductsPerPage(response.pagination.productsPerPage);
        setError(null);
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
    fetchProducts(1, 10);
  }, []);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchUsers(page, productsPerPage);
    }
  };

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

  // Función para refrescar después de crear/actualizar
  const handleProductChange = () => {
    fetchProducts(currentPage, productsPerPage);
  };

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Productos</h1>
        <div>
          <CreateProductDialog onProductCreated={handleProductChange} />
        </div>
      </div>

      {/* Información de paginación */}
      {totalProducts > 0 && (
        <div className="text-sm text-gray-600 mb-4">
          Mostrando {(currentPage - 1) * productsPerPage + 1} -{" "}
          {Math.min(currentPage * productsPerPage, totalProducts)} de{" "}
          {totalProducts} productos
        </div>
      )}

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-error">{error}</p>}

      {products && products.length > 0 ? (
        <>
          <Table>
            <TableCaption className="table-caption">
              Lista de Productos
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="table-head">ID</TableHead>
                <TableHead className="table-head">Nombre</TableHead>
                <TableHead className="table-head">Categoria</TableHead>
                <TableHead className="table-head">Precio</TableHead>
                <TableHead className="table-head">Stock</TableHead>
                <TableHead className="table-head">Proveedor</TableHead>
                <TableHead className="table-head">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  className="table-row"
                  key={product.id_product || product.name}
                >
                  <TableCell className=" table-cell font-medium">
                    {product.id_product}
                  </TableCell>
                  <TableCell className="table-cell">{product.name}</TableCell>
                  <TableCell className="table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="table-cell">{product.price}</TableCell>
                  <TableCell className="table-cell">${product.stock}</TableCell>
                  <TableCell className="font-medium">
                    {product.supplier.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 justify-center">
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

          {/* Componente de paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </>
      ) : (
        !loading && <p>No hay productos disponibles</p>
      )}
    </div>
  );
};

export default ProductList;
