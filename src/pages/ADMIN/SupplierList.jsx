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
import CreateSupplierDialog from "@/components/suppliers/CreateSupplierDialog";
import UpdateSupplierDialog from "@/components/suppliers/UpdateSupplierDialog";
import Pagination from "@/components/Pagination";
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [suppliersPerPage, setSuppliersPerPage] = useState(10);

  // Cargar los proveedores al montar el componente
  const fetchSuppliers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await SupplierService.getAllSuppliers(page, limit);
      console.log(response.pagination);

      // Verificar si response.suppliers existe
      if (response?.suppliers && response?.pagination) {
        setSuppliers(response.suppliers);
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalSuppliers(response.pagination.totalSuppliers);
        setSuppliersPerPage(response.pagination.suppliersPerPage);
        setError(null);
      } else {
        console.error("Formato de respuesta inesperado:", response);
        setError("Formato de respuesta inesperado");
        setSuppliers([]);
      }
    } catch (error) {
      console.error("Error al obtener los proveedores", error);
      setError(error.message || "Error al obtener proveedores");
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(1, 10); // Cargar primera página al montar el componente
  }, []);

  // Función para cmbiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchSuppliers(page, suppliersPerPage);
    }
  };

  // Función para eliminar un proveedor
  const handleDelete = async (supplierId) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar al proveedor con ID: ${supplierId}?`
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await SupplierService.deleteSupplier(supplierId);
            setSuppliers(
              suppliers.filter(
                (supplier) => supplier.id_supplier !== supplierId
              )
            );
            return { success: true }; // Devolver un valor para indicar éxito
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Eliminando proveedor...",
          success: "Proveedor eliminado correctamente",
          error: "No se pudo eliminar el proveedor",
        }
      );
    }
  };

  // Función para refrescar después de crear/actualizar
  const handleSupplierChange = () => {
    fetchSuppliers(currentPage, suppliersPerPage);
  };

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Proveedores</h1>
        <div>
          <CreateSupplierDialog onSupplierCreated={handleSupplierChange} />
        </div>
      </div>

      {/* Información de paginación */}
      {totalSuppliers > 0 && (
        <div className="text-sm text-gray-600 mb-4">
          Mostrando {(currentPage - 1) * suppliersPerPage + 1} -{" "}
          {Math.min(currentPage * suppliersPerPage, totalSuppliers)} de{" "}
          {totalSuppliers} proveedores
        </div>
      )}

      {loading && <p>Cargando Proveedores...</p>}
      {error && <p className="text-error">{error}</p>}

      {suppliers && suppliers.length > 0 ? (
        <>
          <Table>
            <TableCaption className="table-caption">
              Lista de Proveedores
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="table-head">ID</TableHead>
                <TableHead className="table-head">Nombre</TableHead>
                <TableHead className="table-head">Teléfono</TableHead>
                <TableHead className="table-head">Dirección</TableHead>
                <TableHead className="table-head">Email</TableHead>
                <TableHead className="table-head">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow
                  className="table-row"
                  key={supplier.id_supplier || supplier.email}
                >
                  <TableCell className="table-cell font-medium">
                    {supplier.id_supplier}
                  </TableCell>
                  <TableCell className="table-cell">{supplier.name}</TableCell>
                  <TableCell className="table-cell">{supplier.phone}</TableCell>
                  <TableCell className="table-cell">
                    {supplier.address}
                  </TableCell>
                  <TableCell className="table-cell">{supplier.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-4 justify-center">
                      <UpdateSupplierDialog
                        supplier={supplier}
                        onSupplierUpdated={fetchSuppliers}
                      />
                      <Button
                        className="delete-btn"
                        onClick={() => handleDelete(supplier.id_supplier)}
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

          {/*  Componente d epaginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </>
      ) : (
        !loading && <p>No hay proveedores disponibles</p>
      )}
    </div>
  );
};

export default SupplierList;
