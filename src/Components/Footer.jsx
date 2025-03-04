import React from 'react';


export default function Footer() {
  return (
    <div style={{ marginTop:'20px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
      <div>&copy; {new Date().getFullYear()} StockApp. All rights reserved.</div>
      <div>
        <strong>Disclaimer:</strong> Buying stocks involves risks and may result in the loss of capital. Please make informed decisions and consider your financial situation before investing.
        </div>
    </div>
  );
}
