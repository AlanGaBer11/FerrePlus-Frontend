import React from "react";
import { Badge } from "@/components/ui/badge";
import DeactivateAccount from "@/components/users/DeactivateAccount";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import "@/styles/profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <Avatar className="profile-avatar">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="profile-info">
            <div className="profile-title-section">
              <h1 className="profile-name">{user?.name}</h1>
              <Badge className={`customer-badge ${user?.role.toLowerCase()}`}>
                {user?.role}
              </Badge>
            </div>
            <div className="profile-subtitle">
              <Badge variant={user?.verified ? "success" : "secondary"}>
                {user?.verified ? "Verificado" : "Sin verificar"}
              </Badge>
              <Badge variant={user?.status ? "success" : "destructive"}>
                {user?.status ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            <div className="profile-quick-info">
              <div className="info-item">
                <Mail className="info-icon" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <DeactivateAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
