// Router
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import { Auth, AuthContext } from "./utils/Auth";
import { MainContext } from "./utils/Context";
import ProtectedRouter from "./router/ProtectedRouter";
import { useContext, useEffect } from "react";

const App = () => {
  return (
    <AuthContext>
      <MainContext>
        <Header />
        <Routes>
          <Route element={<ProtectedRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-product" element={<AllProducts />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </MainContext>
    </AuthContext>
  );
};

export default App;
