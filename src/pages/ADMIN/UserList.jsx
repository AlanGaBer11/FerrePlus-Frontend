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
import CreateUserDialog from "@/components/users/CreateUserDialog";
import UpdateUserDialog from "@/components/users/UpdateUserDialog";
import UserService from "@/services/users/UserService";
import ToastService from "@/services/toast/ToastService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los usuarios al montar el componente
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers();
      // Verifica si response.users existe
      if (response?.users) {
        setUsers(response.users);
      } else {
        console.error("Formato de respuesta inesperado:", response);
        setError("Formato de respuesta inesperado");
        setUsers([]); // Asegurarnos que users es un array vacío en caso de error
      }
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
      setError(error.message || "Error al obtener los usuarios");
      setUsers([]); // Asegurarnos que users es un array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Array vacío para que solo se ejecute una vez al montar el componente

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
            setUsers(users.filter((user) => user.id_user !== userId));
            return { success: true }; // Devolver un valor para indicar éxito
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

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestión de Usuarios</h1>
        <div>
          <CreateUserDialog onUserCreated={fetchUsers} />
        </div>
      </div>
      {loading && <p>Cargando Usuarios...</p>}
      {error && <p className="text-error">{error}</p>}

      {users && users.length > 0 ? (
        <Table>
          <TableCaption style={{ marginTop: "10px" }}>
            Lista de Usuarios
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Rol</TableHead>
              <TableHead className="text-center">Verificado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_user || user.email}>
                <TableCell className="font-medium">{user.id_user}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.verified ? "Sí" : "No"}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <UpdateUserDialog user={user} onUserUpdated={fetchUsers} />
                    <Button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id_user)}
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
        !loading && <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default UserList;
