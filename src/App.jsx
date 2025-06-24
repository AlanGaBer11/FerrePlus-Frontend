import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/layout/Navbar";
import ToastContainer from "./services/toast/ToastContainer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
