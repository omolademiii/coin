import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CurrencyDetails = () => {
  const { currencyId } = useParams();
  const [currencyDetails, setCurrencyDetails] = useState(null);

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`);
        const currencyData = response.data;
        const currency = currencyData.find(currency => currency === currencyId.toUpperCase()); 
        if(currency) {
          setCurrencyDetails(currency);
        } else {
          throw new Error('Currency not found');
        }
      } catch (error) {
        console.error('Error fetching currency details:', error);
      }
    };

    fetchCurrencyDetails();
  }, [currencyId]);

  if (!currencyDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{currencyDetails}</h2>
    </div>
  );
};

export default CurrencyDetails;

