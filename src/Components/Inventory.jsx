import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import InventoryStocks from "./InventoryStocks";
import { AuthContext } from "../Context/AuthContext"; // Ensure correct import path
import { errorHandle } from "../utility/errorHandle";

function Inventory() {
  const [inventory, setInventory] = useState(null);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [isProfit, setIsProfit] = useState(true);
  const { isLoggedIn, handleLogin, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!!jwt) {
      handleLogin();
    }

    if (jwt) {
      const fetchInventory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/inventory/all/${localStorage.getItem("userId")}`, {
              headers: {
                'Authorization': `Bearer ${jwt}`
              }
            }
          );
          const inventoryData = response.data[0];
          inventoryData.stocks.reverse();
          setInventory(inventoryData);
          // console.log(inventoryData);
        } catch (error) {
          errorHandle(error, handleLogout);
          console.error("Error fetching inventory:", error);
        }
      };

      fetchInventory();
    }
  }, [handleLogin, handleLogout]);

  const calculateCurrentValue = async () => {
    let totalValue = 0;
    if (inventory && inventory.stocks) {
      for (const stock of inventory.stocks) {
        try {
          const response = await axios.get(`http://localhost:5000/stocks/currentprice/${stock.symbol}`);
          const currentPrice = response.data;
          totalValue += currentPrice * stock.quantity;
        } catch (error) {
          console.error("Error fetching stock price:", error);
        }
      }
    }
    setTotalCurrentValue(totalValue);
    setIsProfit(totalValue >= inventory.totalInvestment);
  };

  useEffect(() => {
    if (inventory) {
      calculateCurrentValue();
    }
  }, [inventory]);

  if (!isLoggedIn) {
    return <div className="text-center mt-5">Please login to get inventory</div>;
  }

  if (!inventory) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (stock) => {
    navigate(`/stocks/${stock.symbol}`, { state: stock });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Inventory</h1>
      <div className="text-center mb-4">
        <h2>Total Investment: ${inventory.totalInvestment.toLocaleString()}</h2>
        <h2 className={isProfit ? 'text-success' : 'text-danger'}>
          Current Value: ${totalCurrentValue.toLocaleString()}
        </h2>
      </div>
      {inventory.stocks.length > 0 ? (
        inventory.stocks.map((stock, index) => {
          // console.log(stock);
          return (
            <div key={index} onClick={() => handleCardClick(stock)}>
              <InventoryStocks
                key={index}
                symbol={stock.symbol}
                name={stock.name}
                purchasePrice={stock.purchasePrice}
                quantity={stock.quantity}
              />
            </div>
          );
        })
      ) : (
        <h1 className="text-center text-muted">No stocks are present</h1>
      )}
    </div>
  );
}

export default Inventory;
