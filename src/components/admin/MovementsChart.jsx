import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useMovementStore from "@/context/MovementContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MovementsChart = () => {
  const { movements, loading, fetchMovements } = useMovementStore();

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  if (loading) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="p-6">
          <p>Cargando gráfico...</p>
        </CardContent>
      </Card>
    );
  }

  // Procesar datos para el gráfico
  const chartData = movements.reduce((acc, movement) => {
    const date = new Date(movement.createdAt).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);

    if (existing) {
      if (movement.type === "ENTRADA") {
        existing.entradas += movement.quantity;
      } else {
        existing.salidas += movement.quantity;
      }
    } else {
      acc.push({
        date,
        entradas: movement.type === "ENTRADA" ? movement.quantity : 0,
        salidas: movement.type === "SALIDA" ? movement.quantity : 0,
      });
    }

    return acc;
  }, []);

  return (
    <Card className="w-full h-[400px]" style={{ padding: "20px" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Movimientos del Mes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="entradas"
              stroke="#4ade80"
              name="Entradas"
            />
            <Line
              type="monotone"
              dataKey="salidas"
              stroke="#f87171"
              name="Salidas"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MovementsChart;
