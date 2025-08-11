import { useEffect, useState } from "react";
import { notificationStore } from "@/stores/NotificationStore";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prev) => [...prev, notification]);
    };

    // Suscribirse al store
    notificationStore.subscribe(handleNotification);

    // Cleanup al desmontar
    return () => {
      notificationStore.unsubscribe(handleNotification);
    };
  }, []);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96 space-y-2">
      {notifications.map((notification, index) => (
        <Alert
          style={{ padding: "15px" }}
          key={index}
          variant="destructive"
          className="bg-white border-red-500 relative"
        >
          <div className="absolute right-2 top-2">
            <Button
              variant="ghost"
              size="sm"
              className="cancel-btn h-6 w-6 p-0 hover:bg-red-100"
              onClick={() => removeNotification(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertTitle>Stock Bajo</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationList;
