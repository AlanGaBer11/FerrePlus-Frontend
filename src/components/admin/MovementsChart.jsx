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

  // Procesar datos para el gráfico - CORREGIDO
  const chartData = movements.reduce((acc, movement) => {
    // Usar 'date' en lugar de 'createdAt'
    const date = new Date(movement.date).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);

    if (existing) {
      // Usar "Entrada" y "Salida" (como viene de la API)
      if (movement.type === "Entrada") {
        existing.entradas += movement.quantity;
      } else if (movement.type === "Salida") {
        existing.salidas += movement.quantity;
      }
    } else {
      acc.push({
        date,
        entradas: movement.type === "Entrada" ? movement.quantity : 0,
        salidas: movement.type === "Salida" ? movement.quantity : 0,
      });
    }

    return acc;
  }, []);

  // Debugging: mostrar los datos procesados
  console.log("Movements from API:", movements);
  console.log("Processed chart data:", chartData);

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
