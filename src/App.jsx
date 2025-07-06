import { BrowserRouter } from "react-router";
import { AuthProvider } from "@/context/AuthContext";
import AppRouter from "@/router/AppRouter";
import Navbar from "@/components/layout/Navbar";
import ToastContainer from "@/components/ToastContainer";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AppRouter />
        </main>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
