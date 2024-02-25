import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinProperties = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
        );
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      <h1>Supported Currencies</h1>
      <ul>
        {currencies.map((currency) => (
          <li key={currency}>
            {currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinProperties;

