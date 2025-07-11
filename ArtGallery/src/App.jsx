import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CandlesPage from "./pages/CandlesPage";
import CrochetPage from "./pages/CrochetPage";
import ResinArtPage from "./pages/ResinArtPage";
import JewelleryPage from "./pages/JewelleryPage";
import TShirtPage from "./pages/TShirtPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactUS from "./pages/ContactUS";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/candles" element={<CandlesPage />} />
            <Route path="/crochet" element={<CrochetPage />} />
            <Route path="/resin-art" element={<ResinArtPage />} />
            <Route path="/jewellery" element={<JewelleryPage />} />
            <Route path="/tshirts" element={<TShirtPage />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
            <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </CartProvider>
  </AuthProvider>
  );
};

export default App;
