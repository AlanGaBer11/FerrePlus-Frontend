import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AppRouter from "@/router/AppRouter";
import Navbar from "@/components/layout/Navbar";
import ToastContainer from "@/components/ToastContainer";
import NotificationList from "@/components/notifications/NotificationList";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AppRouter />
        </main>
        <NotificationList />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
