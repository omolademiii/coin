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
    <div>
      <h2>{currencyDetails?.name}</h2>
      <p>{currencyDetails?.market_data.current_price.usd}</p>
    </div>
  );
};

export default CurrencyDetails;

