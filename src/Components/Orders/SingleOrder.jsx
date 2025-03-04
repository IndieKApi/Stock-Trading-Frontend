// Order.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AllStocks.css"

const SingleOrder = ({ order }) => {
  return (
      <div className="qwerty card p-3 shadow-sm border mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold">{order.stockName}</h6>
            <span className="badge bg-light text-dark fw-semibold">
              {order.stockSymbol}
            </span>
            <p className="text-muted mb-0">Order Type: {order.orderType}</p>
            <p className="text-muted mb-0">Quantity: {order.quantity}</p>
            <p className="text-muted mb-0">Price: ${order.price}</p>
            <p className="text-muted mb-0">Order Value: ${order.orderValue}</p>
            <p className="text-muted mb-0">
              Date: {new Date(order.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        
      </div>
  );
};

export default SingleOrder;
