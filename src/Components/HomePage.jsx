import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stock } from "./Stock";
import { Link, Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stocks/top20");
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStocks();
  }, []);


  const handleCardClick = (stock) => {
    navigate(`/stocks/${stock.symbol}`, { state: stock });
  };


  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {stocks.map((stock) => (
          <div key={stock.id} className="col">
            <div>
            <div className="qwerty" onClick={()=> handleCardClick(stock)}>
                <Stock
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  exchange={stock.exchangeShortName}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{height:'60px'}}></div>
    </div>
  );
};

export default HomePage;
