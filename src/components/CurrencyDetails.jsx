import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CurrencyDetails = () => {
  const { currencyId } = useParams();
  const [currencyDetails, setCurrencyDetails] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${currencyId}`);
        // console.log(response)
        setLoading(false)
        setCurrencyDetails(response.data)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching currency details:', error);
      }
    };

    fetchCurrencyDetails();
  }, [currencyId]);
  
  useEffect(() => {
    console.log(currencyDetails)
  }, [currencyDetails])
  if (loading) return <div>Loading...</div>;

  return (
    <div className='px-[150px] py-[40px] flex justify-between'>
      <div className='w-[500px]'>
      <div className='flex justify-between'>
      <div className='flex gap-3'>
      <img src={currencyDetails?.image.small} alt="" />
      <h2 className='text-2xl font-semibold mt-2'>{currencyDetails?.name}</h2>
      </div>
      <form className="max-w-md mx-auto">
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
      placeholder="currency"
      required=""
    />
    <button
      type="submit"
      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>
</form>

      </div>
      <p className='text-4xl font-bold mt-4'>${currencyDetails?.market_data.current_price.usd.toLocaleString()}</p>
      <h2 className='mt-4 text-lg font-medium'> twitter followers : { currencyDetails?.community_data.twitter_followers.toLocaleString()}</h2>
      <div className='border-light border-2 border-gray-300 px-6 py-4 mt-4'>
      <div className='flex justify-between'>
        <h2> Market Cap </h2>
        <p>{currencyDetails?.market_data.market_cap.btc.toLocaleString()} </p>
      </div>
      <div className='flex justify-between mt-4' >
        <h2> Total Supply </h2>
        <p>{currencyDetails?.market_data.total_supply.toLocaleString()} </p>
      </div>
      <div className='flex justify-between mt-4'>
        <h2> Market Cap </h2>
        <p>{currencyDetails?.market_data.market_cap.btc.toLocaleString()} </p>
      </div>
      <div className='flex justify-between mt-4'>
        <h2> Market Cap </h2>
        <p>{currencyDetails?.market_data.market_cap.btc.toLocaleString()} </p>
      </div>
      
      </div>

      </div>
      <div>
        <p className='w-[500px] leading-7 tracking-normal text-base font-normal'>
         {currencyDetails?.description.en}
        </p>
      </div>
    </div>
  );
};

export default CurrencyDetails;

