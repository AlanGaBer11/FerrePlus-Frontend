import { useEffect } from "react";
import useProductStore from "@/context/ProductContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductsHome = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  return (
    <div
      className="mx-auto px-4 py-8"
      style={{ margin: "20px", padding: "5px" }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">
        Catálogo de Productos
      </h1>

      {loading && (
        <div className="text-center">
          <p className="text-lg">Cargando productos...</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id_product}
              className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Header con nombre y categoría */}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge
                    variant={
                      product.stock > 10
                        ? "default"
                        : product.stock > 0
                        ? "warning"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {product.stock > 0
                      ? `${product.stock} unidades`
                      : "Sin stock"}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-2 min-h-[3rem]">
                  {product.name}
                </CardTitle>
              </CardHeader>

              {/* Content con información del proveedor */}
              <CardContent className="flex-grow">
                {product.supplier && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Proveedor:</span>{" "}
                    {product.supplier.name}
                  </div>
                )}
              </CardContent>

              <Separator className="my-2" />

              {/* Footer con precio */}
              <CardFooter className="pt-3">
                <div className="w-full flex justify-between items-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No hay productos disponibles
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductsHome;
