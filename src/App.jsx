import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoTable from "./components/CryptoTable";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [mostPromising, setMostPromising] = useState(null);

  // Fetch cryptocurrency data from CoinGecko API
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
        setFilteredCryptos(response.data);
        calculateMostPromising(response.data); // Calculate the most promising crypto
      } catch (error) {
        console.error("Error fetching cryptocurrency data", error);
      }
    };

    fetchCryptoData();
  }, []);

  // Calculate the most promising cryptocurrency
  const calculateMostPromising = (cryptos) => {
    const promisingCrypto = cryptos.reduce((best, current) => {
      // Select the crypto with the highest price change percentage and a high market cap
      if (
        current.price_change_percentage_24h > 0 &&
        (!best ||
          current.price_change_percentage_24h >
            best.price_change_percentage_24h)
      ) {
        return current;
      }
      return best;
    }, null);

    setMostPromising(promisingCrypto);
  };

  // Filter cryptocurrencies based on search input
  const handleSearch = (searchQuery) => {
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCryptos(filtered);
  };

  return (
    <div className="App">
      <h1>Real-Time Cryptocurrency Tracker</h1>
      {mostPromising && (
        <div className="most-promising">
          <h2>Most Promising Cryptocurrency</h2>
          <p>
            <strong>{mostPromising.name}</strong> (
            {mostPromising.symbol.toUpperCase()}) is leading with a{" "}
            <strong>
              {mostPromising.price_change_percentage_24h.toFixed(2)}% increase
            </strong>{" "}
            in the last 24 hours and a market cap of{" "}
            <strong>${mostPromising.market_cap.toLocaleString()}</strong>.
          </p>
          {/* Warning Label */}
          <div className="warning-label">
            <p>
              <strong className="warning">Warning:</strong> This project is for practice purposes
              only. I do not condone investing in any form of cryptocurrency!
              Please be responsible with your disposable income.
            </p>
          </div>
        </div>
      )}
      <SearchBar onSearch={handleSearch} />
      <CryptoTable cryptos={filteredCryptos} />
    </div>
  );
}

export default App;