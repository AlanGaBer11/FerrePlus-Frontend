import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../../components/AppSidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="dashboard-container" style={{ display: "flex" }}>
        <AppSidebar />

        {/* Contenido principal */}
        <div className="dashboard-content" style={{ flex: 1, padding: "20px" }}>
          <SidebarTrigger /> {/* Botón para alternar el sidebar */}
          {/* Aquí se renderizarán las rutas anidadas */}
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
