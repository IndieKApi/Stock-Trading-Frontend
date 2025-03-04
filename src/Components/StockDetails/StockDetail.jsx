// StockDetail.js
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import StockChart from "./StockChart";
import StockQuote from "./StockQuote";
import CompanyDetails from "./CompanyDetails";
import BuySell from "./BuySell";

const StockDetail = () => {
  const { symbol } = useParams();
  const location = useLocation();
  const stock = location.state;

  console.log(stock);
  

  const centeredContentStyle = {
    width: '100%',
    maxWidth: '1000px',
    margin: '15px',
    transform: 'scaleZ(-1)'
};


  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '100%' }}>

    
      <div style={centeredContentStyle}>
        <CompanyDetails symbol={symbol} />
      </div>

      <div style={centeredContentStyle}>
        <StockChart symbol={symbol}/>
      </div>
      <div style={centeredContentStyle}>
        <StockQuote symbol={symbol} />
      </div>
      <div style={centeredContentStyle}>
        <BuySell symbol={symbol} name={stock.name} price={stock.price}
                  exchange={stock.exchangeShortName} />
      </div>
      <div style={{height:'70px'}}></div>
      <div>
      </div>
    </div>
  );
};

export default StockDetail;
