import { useEffect } from "react";
import useProductStore from "@/context/ProductContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Store, AlertTriangle, CheckCircle } from "lucide-react";
import Pagination from "@/components/Pagination";

const ProductsHome = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    currentPage,
    totalPages,
    totalProducts,
    productsPerPage,
  } = useProductStore();

  useEffect(() => {
    fetchProducts(1, 8);
  }, [fetchProducts]);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchProducts(page, productsPerPage);
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        variant: "destructive",
        text: "Sin stock",
        icon: <AlertTriangle className="w-3 h-3" />,
        className: "bg-red-100 text-red-800 border-red-200",
      };
    } else if (stock <= 5) {
      return {
        variant: "outline",
        text: `${stock} unidades`,
        icon: <AlertTriangle className="w-3 h-3" />,
        className: "bg-yellow-50 text-yellow-700 border-yellow-300",
      };
    } else {
      return {
        variant: "secondary",
        text: `${stock} unidades`,
        icon: <CheckCircle className="w-3 h-3" />,
        className: "bg-green-50 text-green-700 border-green-300",
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-xl font-medium text-gray-700">
            Cargando productos...
          </p>
          <p className="text-gray-500">Preparando el mejor catálogo para ti</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div className="max-w-[1800px] mx-auto">
        {/* Content */}
        <div className="py-12">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              {error}
            </div>
          )}

          {products && products.length > 0 ? (
            <>
              <div className="mb-8 text-center">
                <p className="text-gray-600">
                  Mostrando{" "}
                  <span className="font-semibold text-blue-600">
                    {(currentPage - 1) * productsPerPage + 1} -{" "}
                    {Math.min(currentPage * productsPerPage, totalProducts)}
                  </span>{" "}
                  de {totalProducts} productos
                </p>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                style={{ padding: "0 16px" }}
              >
                {products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);

                  return (
                    <Card
                      key={product.id_product}
                      className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out border-0 shadow-lg bg-white overflow-hidden"
                    >
                      <CardHeader
                        className="pb-4 px-6"
                        style={{ padding: "24px 24px 16px 24px" }}
                      >
                        <div className="flex justify-end items-start mb-3">
                          <Badge
                            variant={stockStatus.variant}
                            className={`text-xs font-medium border flex items-center gap-1 ${stockStatus.className} transition-all duration-300`}
                          >
                            {stockStatus.icon}
                            {stockStatus.text}
                          </Badge>
                        </div>

                        <CardTitle className="text-lg font-bold leading-tight min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-300">
                          {product.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent
                        className="flex-grow space-y-4 px-6"
                        style={{ padding: "0 24px 16px 24px" }}
                      >
                        {product.supplier && (
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg transition-all duration-300 group-hover:bg-blue-50">
                            <Store className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Proveedor
                              </p>
                              <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">
                                {product.supplier.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <Separator className="opacity-30" />

                      <CardFooter
                        className="pt-6 px-6 bg-gradient-to-r from-gray-50 to-white"
                        style={{ padding: "24px 24px 24px 24px" }}
                      >
                        <div className="w-full flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">
                              Precio
                            </p>
                            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {formatPrice(product.price)}
                            </div>
                          </div>

                          {product.stock > 0 && (
                            <div className="text-right">
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              <p className="text-xs text-green-600 font-medium mt-1">
                                Disponible
                              </p>
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  disabled={loading}
                />
              </div>
            </>
          ) : (
            !loading && (
              <div className="text-center py-20">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-700">
                      No hay productos disponibles
                    </h3>
                    <div className="flex justify-center pt-4">
                      <p className="text-gray-500 max-w-md mx-auto text-center">
                        Parece que no tenemos productos en este momento. Vuelve
                        pronto para ver nuestras novedades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;
