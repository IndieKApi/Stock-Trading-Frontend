import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from 'react-router-dom';

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks/all/NASDAQ');
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (stock) => {
    navigate(`/stocks/${stock.symbol}`, { state: stock });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Stocks</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by stock name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredStocks.map((stock) => (
          <div key={stock.id} className="col">
            <div className="qwerty card p-3 shadow-sm border">
              <h5 className="card-title">{stock.name}</h5>
              <p className="card-text">Symbol: {stock.symbol}</p>
              <p className="card-text">Price: ${stock.price}</p>
              <p className="card-text">Exchange: {stock.exchangeShortName}</p>
              <div onClick={() => handleCardClick(stock) } className="btn btn-primary">
                View Details
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{height:'60px'}}></div>

    </div>
  );
};

export default AllStocks;
