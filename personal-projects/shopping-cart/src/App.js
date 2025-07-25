import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket.js";
import "./App.css"; // Ensure the CSS is imported

function App() {
  return (
    <Router>
      <nav className="app-nav">
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/basket">Basket</Link>
        </div>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;