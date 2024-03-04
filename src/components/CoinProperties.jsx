import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCoinList from "./SingleCoinList";

const CoinProperties = () => {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en"
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
      <h1 className="">Supported Currencies</h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Coin
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                24h
              </th>
              <th scope="col" className="px-6 py-3">
                High 24h
              </th>
              <th scope="col" className="px-6 py-3">
                Low 24h
              </th>
              <th scope="col" className="px-6 py-3">
                Total volume
              </th>
              <th scope="col" className="px-6 py-3">
                Market cap
              </th>
            </tr>
          </thead>
          <tbody>
            {!currencies
              ? "loading currencies"
              : currencies.map((currency,index) => (
                  <SingleCoinList key={currency.id} currency={currency} index={index+1} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinProperties;
