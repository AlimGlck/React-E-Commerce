import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";
import Home from "./Home/index.js";
import Orders from "./Orders/index.js";
import Products from "./Products/index.js";
import ProductDetail from "./ProductDetail/index.js";
import NewProduct from "./Products/new.js";

function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="orders">Order</Link>
          </li>
          <li>
            <Link to="products">Products</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<NewProduct />} />
        <Route path="products/:product_id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default Admin;
