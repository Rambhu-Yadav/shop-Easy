import React, { useEffect, useState, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { fetchAllProducts } from "./slices/productSlice";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer/Footer";
import { fetchCartItems } from "./slices/cartSlice";
import Cart from "./pages/Cart";

export const UserContext = createContext();
export const ProductContext = createContext();

let existingUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const App = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productState);
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems(user.id))
  }, [])

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/cart"
            element={<Cart/>}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
