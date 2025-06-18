import "./App.css";
import Navbar from "./components/layout/Navbar";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
