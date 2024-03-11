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
      <div className='flex gap-3'>
      <img src={currencyDetails?.image.thumb} alt="" />
      <h2 className='text-2xl font-semibold'>{currencyDetails?.name}</h2>
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

