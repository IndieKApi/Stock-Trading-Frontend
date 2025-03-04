import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const StockQuote = ({ symbol }) => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchStockQuote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/quote/${symbol}`);
        setQuote(response.data);
      } catch (error) {
        console.error("Error fetching stock quote:", error);
      }
    };

    fetchStockQuote();
  }, [symbol]);

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card p-3 shadow-sm border mt-4">
      <div className="row align-items-center">
        {/* <div className="col-md-12 text-center">
          <h3 className="mb-0 fw-bold">{quote.name}</h3>
          <p className="text-muted mb-0">{quote.exchange}</p>
          <p className="text-muted mb-0">Price: ${quote.price}</p>
          <p className="text-muted mb-0">Change: {quote.change} ({quote.changesPercentage}%)</p>
        </div> */}
      </div>
      <div className="mt-3">
        <h5 className="fw-bold">Stock Details</h5>
        <table className="table">
          <thead>
            
          </thead>
          <tbody>
            <tr>
              <td>Day Low: {quote.dayLow}</td>
              <td>Day High: {quote.dayHigh}</td>
              <td>Year High: {quote.yearHigh}</td>
              <td>Year Low: {quote.yearLow}</td>
            </tr>
            <tr>
              <td>Market Cap: ${quote.marketCap.toLocaleString()}</td>
              <td>Volume: {quote.volume.toLocaleString()}</td>
              <td>Avg Volume: {quote.avgVolume.toLocaleString()}</td>
              <td>EPS: {quote.eps}</td>
            </tr>
            <tr>
              <td>PE Ratio: {quote.pe}</td>
              <td>Previous Close: {quote.previousClose}</td>
              <td>Open: {quote.open}</td>
              <td>Earnings Announcement: {new Date(quote.earningsAnnouncement).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Price Avg 50: {quote.priceAvg50}</td>
              <td>Price Avg 200: {quote.priceAvg200}</td>
              <td>Shares Outstanding: {quote.sharesOutstanding.toLocaleString()}</td>
              <td>Timestamp: {new Date(quote.timestamp * 1000).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockQuote;
