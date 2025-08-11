import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div
        className="dashboard-container"
        style={{ display: "flex", width: "100%", height: "100vh" }}
      >
        <AppSidebar />

        {/* Contenido principal */}
        <div
          className="dashboard-content"
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          {/* Boton para alternar la barra lateral */}
          <SidebarTrigger />
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "10px 0",
              textAlign: "left",
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
