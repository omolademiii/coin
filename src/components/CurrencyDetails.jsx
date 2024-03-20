import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CurrencyDetails = () => {
  const { currencyId } = useParams();
  const [currencyDetails, setCurrencyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${currencyId}`);
        setLoading(false);
        setCurrencyDetails(response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching currency details:', error);
      }
    };

    fetchCurrencyDetails();
  }, [currencyId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-8 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col md:flex-row items-center md:items-start md:gap-3">
            <img src={currencyDetails?.image.small} alt="" className="w-16 h-16 md:w-20 md:h-20" />
            <h2 className="text-xl md:text-2xl font-semibold mt-2 md:mt-0">{currencyDetails?.name}</h2>
          </div>
          <p className="text-3xl md:text-4xl font-bold mt-4">${currencyDetails?.market_data.current_price.usd.toLocaleString()}</p>
          <h2 className="mt-4 text-base md:text-lg font-medium">Twitter followers: { currencyDetails?.community_data.twitter_followers.toLocaleString()}</h2>
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <div className="flex justify-between">
              <h2>Market Cap</h2>
              <p>{currencyDetails?.market_data.market_cap.btc.toLocaleString()}</p>
            </div>
            <div className="flex justify-between mt-2">
              <h2>Total Supply</h2>
              <p>{currencyDetails?.market_data.total_supply.toLocaleString()}</p>
            </div>
            
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p className="mt-4 md:mt-0 leading-7 tracking-normal text-base md:text-lg font-normal">
            {currencyDetails?.description.en}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetails;

