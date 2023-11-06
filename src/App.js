import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllProducts from "./components/AllProducts";
import BackOffice from "./components/BackOffice";
import NavBar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Path: "/" */}
        <Route path="/" element={<AllProducts />} />

        {/* Path: /backoffice */}
        <Route path="/backoffice" element={<BackOffice />} />
        <Route path="/backoffice/:id" element={<BackOffice />} />

        {/* Path: /product/:id */}
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
