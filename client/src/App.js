import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import SignIn from "./pages/Auth/SignIn/index.js";
import SignUp from "./pages/Auth/SignUp/index.js";
import ProductDetail from "./pages/ProductDetail/index.js";
import Profile from "./pages/Profile/index.js";
import Products from "./pages/Products/index.js";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import Basket from "./pages/Basket/index.js";
import Error404 from "./pages/Error404/index.js";
import Admin from "./pages/Admin/index.js";
import ProtectedRoute2 from "./pages/ProtectedRoute2.js";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="product/:product_id" element={<ProductDetail />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="basket" element={<Basket />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute2 />}>
              <Route path="admin/*" element={<Admin />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
