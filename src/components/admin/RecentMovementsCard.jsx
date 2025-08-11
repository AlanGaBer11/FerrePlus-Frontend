import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useMovementStore from "@/context/MovementContext";
import { formatDate } from "@/lib/utils";

const RecentMovementsCard = () => {
  const { movements, loading, fetchMovements } = useMovementStore();

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const recentMovements = movements.slice(0, 5); // Mostrar solo los últimos 5

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p>Cargando movimientos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" style={{ padding: "20px" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Últimos Movimientos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMovements.length === 0 ? (
            <p className="text-gray-500">No hay movimientos recientes</p>
          ) : (
            <div className="grid gap-2">
              {recentMovements.map((movement) => (
                <div
                  key={movement.id_movement}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {movement.product?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(movement.createdAt)}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      movement.type === "Entrada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {movement.type}: {movement.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMovementsCard;
