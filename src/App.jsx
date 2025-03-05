import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllStocks from './Components/AllStocks';
import Inventory from './Components/Inventory.jsx';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Navbar from './Components/NavBar';
import HomePage from './Components/HomePage';
import StockDetail from './Components/StockDetails/StockDetail';
import Orders from './Components/Orders.jsx';
import Footer from './Components/Footer.jsx';
import { AuthContext } from './Context/AuthContext.jsx';

const App = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onSignOut={handleLogout} />
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/all-stocks" element={<AllStocks />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stocks/:symbol" element={<StockDetail />} />
        </Routes>
      </div>
      <footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        <Footer />
      </footer>
    </>
  );
};

export default App;
