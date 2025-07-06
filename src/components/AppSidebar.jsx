import { Link } from "react-router";
import { useState } from "react";
import {
  Home,
  Users,
  BookPlus,
  PackageSearch,
  ScanBarcode,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  // Estado para rastrear el ítem activo
  const [activeItem, setActiveItem] = useState("/admin/dashboard");

  // Menu items
  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Usuarios",
      url: "/admin/dashboard/users",
      icon: Users,
    },
    {
      title: "Proveedores",
      url: "/admin/dashboard/suppliers",
      icon: BookPlus,
    },
    {
      title: "Productos",
      url: "/admin/dashboard/products",
      icon: ScanBarcode,
    },
    {
      title: "Movimientos",
      url: "/admin/dashboard/movements",
      icon: PackageSearch,
    },
  ];

  // Función para actualizar el ítem activo
  const handleItemClick = (url) => {
    setActiveItem(url);
  };

  return (
    <Sidebar
      collapsible="icon"
      style={{
        marginTop: "80px",
        paddingTop: "20px",
        transition: "all 0.3s ease",
      }}
    >
      <SidebarContent style={{ padding: "10px" }}>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-[#283949] uppercase tracking-wider px-10 text-center">
            Administración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors duration-200 ${
                      activeItem === item.url
                        ? "bg-blue-50 text-"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Link
                      to={item.url}
                      onClick={() => handleItemClick(item.url)}
                      className="flex items-center px-4 py-3 rounded-lg"
                    >
                      <div
                        className={`${
                          activeItem === item.url
                            ? "text-[#759dbb]"
                            : "text-gray-500"
                        }`}
                      >
                        <item.icon size={18} className="mr-3" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {activeItem === item.url && (
                        <div className="ml-auto w-1.5 h-5 bg-[#759dbb] rounded-full"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
