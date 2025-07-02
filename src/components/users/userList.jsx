import React from "react";
import "../../styles/list.css";

const UserList = () => {
  const handleClick = () => {
    // Aquí puedes manejar la lógica para crear un usuario
    alert("Crear Usuario button clicked");
  };

  return (
    <div className="list-container">
      <div className="top">
        <h1>Gestion de Usuarios</h1>
        <button onClick={handleClick}>Crear Usuario</button>
      </div>
    </div>
  );
};

export default UserList;
