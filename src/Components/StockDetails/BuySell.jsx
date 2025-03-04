import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

export default function BuySell({ symbol, name, price, exchange }) {
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setIsLoggedIn(!!jwt);
  }, []);

  const handleBuy = async () => {
    if (!isLoggedIn) {
      setMessage('You are not logged in. Please log in first.');
      return;
    }

    try {
      const inventoryId = localStorage.getItem('inventoryId');
      const jwt = localStorage.getItem('jwt');
      const response = await axios.post(`http://localhost:5000/order/buy-stock/${inventoryId}`, [
        {
          symbol,
          name,
          purchasePrice: price,
          quantity: Number(quantity)
        }
      ], {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      console.log(response);
      setMessage('Buy order executed successfully.');
      navigate('/inventory');
    } catch (error) {
      console.log("Error executing buy order:", error);
      setMessage('Error executing buy order. Please try again.');
    }
  };

  const handleSell = async () => {
    if (!isLoggedIn) {
      setMessage('You are not logged in. Please log in first.');
      return;
    }

    try {
      const inventoryId = localStorage.getItem('inventoryId');
      const jwt = localStorage.getItem('jwt');
      const response = await axios.post(`http://localhost:5000/order/sell-stock/${inventoryId}?stockSymbol=${symbol}&stockQuantity=${quantity}`, {}, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      
      if (response.status === 404) {
        
        setMessage(response.data.message);
      } else {
        setMessage('Sell order executed successfully.');
        navigate('/inventory');
      }
      console.log(response.data.message + "kapil");
    } catch (error) {
      
      setMessage('Insufficient Quantity to Sell');
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setMessage('Negative values cannot be entered.');
    } else {
      setQuantity(value);
      setMessage('');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card p-3 shadow-sm border" style={{ width: '550px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold">Trade {symbol}</h6>
          </div>
          <div>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="btn btn-primary me-2" onClick={handleBuy}>
              Buy
            </button>
            <button className="btn btn-danger" onClick={handleSell}>
              Sell
            </button>
          </div>
        </div>
        {message && (
          <div className={`alert mt-2 ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
