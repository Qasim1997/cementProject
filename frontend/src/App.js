import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nacbar from './component/Navbar'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from './pages/Dashborad'
import Product_detail from './pages/Product_detail'
import CustomerDetail from './pages/ClientDetail'
import Stock_detail from './pages/Stock_detail'
import Customer from './pages/Client'
import StockUpdate from "./pages/StockUpdate";
import ClientUpdate from "./pages/ClientUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Nacbar/>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<Dashboard/>} />
      <Route path="/product_add" element={<Product_detail/>} />
      <Route path="/stock" element={<Stock_detail/>} />
      <Route path="/stock/:category/:id" element={<StockUpdate/>} />
      <Route path="/product/:id" element={<Stock_detail/>} />
      <Route path="/customer_detail/:category/:id" element={<ClientUpdate/>} />
      <Route path="/customer_detail" element={<CustomerDetail/>} />
      <Route path="/customer" element={<Customer/>} />





    




    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
