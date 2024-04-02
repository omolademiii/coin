import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCoinList from "./SingleCoinList";

const CoinProperties = () => {
  const [currencies, setCurrencies] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const pageSize = 50;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${pageNumber}&sparkline=false&locale=en`
        );
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
        setSearchResult(response.data.coins);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    if (searchQuery !== "") {
      searchCurrencies();
    } else {
      setSearchResult([]);
      setShowSearchResults(false);
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <form className="mt-4 mb-8 sm:mt-8">
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search currency"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className={showSearchResults ? "block" : "hidden"}>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex justify-center">
            <div
              className="bg-white border-b p-8 rounded-lg shadow-lg"
              style={{ width: "250px", maxHeight: "400px", overflowY: "auto" }}
            >
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              {searchResult.map((result) => (
                <a
                  key={result.id}
                  href={`/currency/${result.id}`}
                  className="flex items-center mb-4 hover:bg-gray-100 rounded-lg p-2"
                >
                  <img src={result.thumb} alt="" className="mr-2" />
                  <span>{result.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredCurrencies.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs uppercase bg-gray-50">
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
              {filteredCurrencies.map((currency, index) => (
                <SingleCoinList
                  key={currency.id}
                  currency={currency}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

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
  );
};

export default CoinProperties;
