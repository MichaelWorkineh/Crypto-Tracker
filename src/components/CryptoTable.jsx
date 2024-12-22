import React from "react";
import "./CryptoTable.css";

function CryptoTable({ cryptos }) {
  return (
    <div className="crypto-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td data-label="Rank">{index + 1}</td>
              <td data-label="Coin" className="coin">
                <img src={crypto.image} alt={crypto.name} />
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </td>
              <td data-label="Price (USD)">${crypto.current_price.toLocaleString()}</td>
              <td
                data-label="24h Change"
                className={
                  crypto.price_change_percentage_24h >= 0
                    ? "positive-change"
                    : "negative-change"
                }
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td data-label="Market Cap">
                ${crypto.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;