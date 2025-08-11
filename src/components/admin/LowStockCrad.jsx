import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useProductStore from "@/context/ProductContext";

const LowStockCard = () => {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const lowStockProducts = products.filter((product) => product.stock < 10);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p>Cargando productos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" style={{ padding: "20px" }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Productos con Bajo Stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500">No hay productos con bajo stock</p>
          ) : (
            <div className="grid gap-2">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id_product}
                  className="flex items-center justify-between p-2 bg-red-50 rounded-lg"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="text-red-600 font-bold">
                    Stock: {product.stock}
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

export default LowStockCard;
