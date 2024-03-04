import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoinProperties from "./components/CoinProperties";
import CurrencyDetails from "./components/CurrencyDetails";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<CoinProperties />} />
        <Route path="/currency/:currencyid" element={<CurrencyDetails />} />
      </Routes>
    </Router>
    );
};

export default App;
