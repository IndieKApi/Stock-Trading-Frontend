import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./Stock.css";

export const Stock = ({ symbol="TICK", name="Company Name", price="100", exchange="NASDAQ" }) => {
  return (
    <div className=" d-flex justify-content-center mt-4">
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
            <span className="text-danger fw-semibold">{exchange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
