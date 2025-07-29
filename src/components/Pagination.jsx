import { Button } from "@/components/ui/button";
import propTypes from "prop-types";
import "@/styles/pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  // Generar array de páginas para mostrar todas
  const getAllPages = (total) => {
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Generar array de páginas a mostrar
  const generatePageNumbers = () => {
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      return getAllPages(totalPages);
    }

    // Para casos con muchas páginas
    const pages = [1]; // Siempre mostramos la primera página

    if (currentPage <= 3) {
      // Mostrar primeras páginas
      pages.push(2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Mostrar últimas páginas
      pages.push(
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      // Mostrar páginas del medio
      pages.push(
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Página {currentPage} de {totalPages}
      </div>

      <div className="pagination-buttons">
        {/* Botón Anterior */}
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className="pagination-btn"
        >
          ← Anterior
        </Button>

        {/* Números de página */}
        {generatePageNumbers().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={disabled}
            className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </Button>
        ))}

        {/* Botón Siguiente */}
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          className="pagination-btn"
        >
          Siguiente →
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
};

export default Pagination;
