import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStocks.css"

const InventoryStocks = ({ keyValue="0", symbol="GOOGL", name="Google", purchasePrice="100", quantity="10" }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/currentprice/${symbol}`);
        setPrice(response.data);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };

    fetchStockPrice();
  }, [symbol]);

  if (!price) {
    return <div>Loading...</div>;
  }

  return (
    <div key={keyValue} className="d-flex justify-content-center mt-4">
      <div className="qwerty card p-3 shadow-sm border" style={{ width: "550px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold">{name}</h6>
            <span className="badge bg-light text-dark fw-semibold">{symbol}</span>
          </div>
          <div className="text-end">
            <h6 className="mb-0 fw-bold">
              {price} <span className="text-muted">USD</span>
            </h6>
            <span className="text-danger fw-semibold">Purchase Price: {purchasePrice} USD</span>
            <br />
            <span className="text-danger fw-semibold">Quantity: {quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStocks;
