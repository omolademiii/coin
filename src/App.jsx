import React from "react";
import { Route, Routes } from "react-router-dom";
import CoinProperties from "./components/CoinProperties";
import CurrencyDetails from "./components/CurrencyDetails";

const App = () => {
  return (
    <Routes>
      <Route index element={<CoinProperties />} />
      <Route path="/currency/:currencyId" element={<CurrencyDetails />} />
    </Routes>
  );
};

export default App;
