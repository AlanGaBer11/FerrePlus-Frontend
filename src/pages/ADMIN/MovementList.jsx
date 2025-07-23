import { useEffect, useState } from "react";
import "@/styles/list.css";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CreateMovementDialog from "@/components/movements/CreateMovementDialog";
import MovementService from "@/services/movements/MovementService";
import ToastService from "@/services/toast/ToastService";
import UpdateMovementDialog from "@/components/movements/UpdateMovementDialog";
const MovementList = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los productos al montar el componente
  const fetchMovements = async () => {
    try {
      setLoading(true);
      const response = await MovementService.getAllMovements();
      // Verificar si response.movements existe
      if (response?.movements) {
        setMovements(response.movements);
      } else {
        console.error("Formato de respuesta inesperado:  ", response);
        setError("Formato de respuesta inesperado");
        setMovements([]);
      }
    } catch (error) {
      console.error("Error al obtener los movimientos", error);
      setError(error.message || "Error al obtener movimientos");
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  // Función para eliminar un movimiento
  const handleDelete = async (movementId) => {
    if (
      window.confirm(
        `¿Estas seguro de eliminar el movimiento con ID: ${movementId}?`
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await MovementService.deleteMovement(movementId);
            setMovements(
              movements.filter(
                (movement) => movement.id_movement !== movementId
              )
            );
          } catch (error) {
            console.error("Error al eliminar el movimiento: ", error);
            throw error;
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Eliminando movimiento...",
          success: "Movimiento eliminado correctamente",
          error: "Error al eliminar el movimiento",
        }
      );
    }
  };
  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Movimientos</h1>
        <div>
          <CreateMovementDialog onMovementCreated={fetchMovements} />
        </div>
      </div>
      {loading && <p>Cargando movimientos...</p>}
      {error && <p className="text-error">{error}</p>}

      {movements && movements.length > 0 ? (
        <Table>
          <TableCaption className="table-caption">
            Lista de Movimientos
          </TableCaption>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="table-head">ID</TableHead>
              <TableHead className="table-head">Tipo</TableHead>
              <TableHead className="table-head">Cantidad</TableHead>
              <TableHead className="table-head">Fecha</TableHead>
              <TableHead className="table-head">Comentarios</TableHead>
              <TableHead className="table-head">Producto</TableHead>
              <TableHead className="table-head">Usuario</TableHead>
              <TableHead className="table-head">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement) => (
              <TableRow className="table-row" key={movement.id_movement}>
                <TableCell className="table-cell font-medium">
                  {movement.id_movement}
                </TableCell>
                <TableCell className="table-cell">{movement.type}</TableCell>
                <TableCell className="table-cell">
                  {movement.quantity}
                </TableCell>
                <TableCell className="table-cell">
                  {format(new Date(movement.date), "PPP", { locale: es })}
                </TableCell>
                <TableCell className="table-cell">
                  {movement.comments}
                </TableCell>
                <TableCell className="table-cell font-medium">
                  {movement.product.name}
                </TableCell>
                <TableCell className=" table-cell font-medium">
                  {movement.user.name}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-center">
                    <UpdateMovementDialog
                      movement={movement}
                      onMovementUpdated={fetchMovements}
                    />
                    <Button
                      className="delete-btn"
                      onClick={() => handleDelete(movement.id_movement)}
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
        !loading && <p>No hay movimientos disponibles</p>
      )}
    </div>
  );
};

export default MovementList;
