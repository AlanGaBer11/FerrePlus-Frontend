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
import SupplierService from "@/services/suppliers/SupplierService";
import ToastService from "@/services/toast/ToastService";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los proveedores al montar el componente
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await SupplierService.getAllSuppliers();
      // Verificar si response.suppliers existe
      if (response?.suppliers) {
        setSuppliers(response.suppliers);
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
    fetchSuppliers();
  }, []);

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

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Proveedores</h1>
        <div>
          <CreateSupplierDialog onSupplierCreated={fetchSuppliers} />
        </div>
      </div>
      {loading && <p>Cargando Proveedores...</p>}
      {error && <p className="text-error">{error}</p>}

      {suppliers && suppliers.length > 0 ? (
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
                <TableCell className="table-cell">{supplier.address}</TableCell>
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
      ) : (
        !loading && <p>No hay proveedores disponibles</p>
      )}
    </div>
  );
};

export default SupplierList;
