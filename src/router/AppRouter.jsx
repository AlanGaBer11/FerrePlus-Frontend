import { Routes, Route } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to FerrePlus</h1>} />
      <Route path="/products" element={<h1>Products Page</h1>} />
      <Route path="/suppliers" element={<h1>Suppliers Page</h1>} />
      <Route path="/movements" element={<h1>Movements Page</h1>} />
    </Routes>
  );
};

export default AppRouter;
