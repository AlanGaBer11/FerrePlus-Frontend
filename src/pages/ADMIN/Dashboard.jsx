import { Outlet, Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2>Panel de Admin</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/products">Productos</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/suppliers">Proveedores</Link>
            </li>
            <li>
              <Link to="/admin/dashboard/movements">Movimientos</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de administración.</p>
        <p>
          Aquí puedes gestionar usuarios, proveedores, productos y movimientos
        </p>

        {/* Aquí se renderizarán las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
