import { useState, useEffect } from "react";
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
import { Button } from "../../components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import UpdateUserDialog from "@/components/users/UpdateUserDialog";
import Pagination from "@/components/Pagination";
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";
import DeactivateAccount from "@/components/users/DeactivateAccount";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // Cargar los usuarios con paginación
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers(page, limit);

      // Verificar si response.users existe
      if (response?.users && response?.pagination) {
        // Debug

        setUsers(response.users);
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalUsers(response.pagination.totalUsers);
        setUsersPerPage(response.pagination.usersPerPage);
        setError(null);
      } else {
        console.error("Formato de respuesta inesperado:", response);
        setError("Formato de respuesta inesperado");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
      setError(error.message || "Error al obtener los usuarios");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, 10); // Cargar primera página al montar el componente
  }, []);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchUsers(page, usersPerPage);
    }
  };

  // Función para eliminar un usuario
  const handleDelete = async (userId) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar al usuario con ID: ${userId}?`
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await UserService.deleteUser(userId);
            // Recargar la página actual después de eliminar
            await fetchUsers(currentPage, usersPerPage);
            return { success: true };
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Eliminando usuario...",
          success: "Usuario eliminado correctamente",
          error: "No se pudo eliminar el usuario",
        }
      );
    }
  };
  // Función para reactivar un usuario
  const handleReactivate = async (userId) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas reactivar al usuario con ID: ${userId}?`
      )
    ) {
      ToastService.promise(
        (async () => {
          setLoading(true);
          try {
            await UserService.reactivateUser(userId);
            // Recargar la página actual después de reactivar
            await fetchUsers(currentPage, usersPerPage);
            return { success: true };
          } finally {
            setLoading(false);
          }
        })(),
        {
          loading: "Reactivando usuario...",
          success: "Usuario reactivado correctamente",
          error: "No se pudo reactivar el usuario",
        }
      );
    }
  };

  // Función para refrescar después de crear/actualizar usuario
  const handleUserChange = () => {
    fetchUsers(currentPage, usersPerPage);
  };

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Usuarios</h1>
        <div className="flex gap-4 items-center">
          <CreateUserDialog onUserCreated={handleUserChange} />
        </div>
      </div>

      {/* Información de paginación */}
      {totalUsers > 0 && (
        <div className="text-sm text-gray-600 mb-4">
          Mostrando {(currentPage - 1) * usersPerPage + 1} -{" "}
          {Math.min(currentPage * usersPerPage, totalUsers)} de {totalUsers}{" "}
          usuarios
        </div>
      )}

      {loading && <p>Cargando Usuarios...</p>}
      {error && <p className="text-error">{error}</p>}

      {users && users.length > 0 ? (
        <>
          <Table>
            <TableCaption className="table-caption">
              Lista de Usuarios
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="table-head">ID</TableHead>
                <TableHead className="table-head">Nombre</TableHead>
                <TableHead className="table-head">Email</TableHead>
                <TableHead className="table-head">Rol</TableHead>
                <TableHead className="table-head">Estado</TableHead>
                <TableHead className="table-head">Verificado</TableHead>
                <TableHead className="table-head">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  className="table-row"
                  key={user.id_user || user.email}
                >
                  <TableCell className="table-cell font-medium">
                    {user.id_user}
                  </TableCell>
                  <TableCell className="table-cell">{user.name}</TableCell>
                  <TableCell className="table-cell">{user.email}</TableCell>
                  <TableCell className="table-cell">{user.role}</TableCell>
                  <TableCell className="table-cell">
                    <div className="flex justify-center">
                      {user.status ? (
                        <Badge
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Activo
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Inactivo
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="table-cell">
                    {user.verified ? "Sí" : "No"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 justify-center">
                      <UpdateUserDialog
                        user={user}
                        onUserUpdated={handleUserChange}
                      />
                      <Button
                        className="delete-btn"
                        onClick={() => handleDelete(user.id_user)}
                        disabled={loading}
                      >
                        Eliminar
                      </Button>
                      <Button onClick={() => handleReactivate(user.id_user)}>
                        Reactivar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Componente de paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </>
      ) : (
        !loading && <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default UserList;
