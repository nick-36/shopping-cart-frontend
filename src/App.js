import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";

import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./components/auth";
import RequireAuth from "./components/requireAuth";
import Failure from "./pages/Failure";
import Success from "./pages/Success";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} style={{ fontSize: "1.6rem" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:cat" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </div>
  );
}

export default App;
