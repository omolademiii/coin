import React from "react";

function SingleCoinList({ currency, index }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index}
      </th>
      <td className="px-6 py-4 flex gap-3 items-center">
        <div className="w-6 h-6 rounded-full">
          <img
            className="w-full h-full rounded-full object-contain"
            src={currency.image}
            alt=""
          />
        </div>
        {currency.name}
        <div className="px-1">
        {currency.symbol}
        </div>
      </td>
      <td className="px-6 py-4">${currency.current_price}</td>
      <td className="px-6 py-4 text-red-600">
        <i className="fas fa-fw fa-caret-down"></i>
        {currency.price_change_percentage_24h}%
        </td>
      <td className="px-6 py-4 text-green-500">{currency.high_24h}</td>
      <td className="px-6 py-4 text-green-500">{currency.low_24h}</td>
      <td className="px-6 py-4">${currency.total_volume}</td>
      <td className="px-6 py-4">${currency.market_cap}</td>
      

    </tr>
  );
}

export default SingleCoinList;
