import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCoinList from "./SingleCoinList";

const CoinProperties = () => {
  const [currencies, setCurrencies] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 50;
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${pageNumber}&sparkline=false&locale=en`
        );
        console.log(response.data);
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [pageNumber]);

  useEffect(() => {
    const searchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    if (searchQuery !== "") {
      searchCurrencies();
    } else {
      // Reset currencies to null when searchQuery is empty
      setCurrencies(null);
    }
  }, [searchQuery]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const filteredCurrencies = currencies
    ? currencies.filter((currency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // https://api.coingecko.com/api/v3/search?query=
  return (
    <div>
      <div className="w-full flex justify-between">
        <form className="w-2/4 mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search currency"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

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
                Price
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
              : filteredCurrencies.map((currency, index) => (
                  <SingleCoinList
                    key={currency.id}
                    currency={currency}
                    index={index + 1}
                  />
                ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md"
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
          >
            Previous Page
          </button>
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md"
            onClick={handleNextPage}
            disabled={filteredCurrencies.length < pageSize}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinProperties;
