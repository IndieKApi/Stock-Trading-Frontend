import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import AllStocks from './Components/AllStocks';
import Inventory from './Components/Inventory.jsx';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Navbar from './Components/NavBar';
import HomePage from './Components/HomePage';
import StockDetail from './Components/StockDetails/StockDetail';
import Orders from './Components/Orders.jsx';
import Footer from './Components/Footer.jsx';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    // Check if the user is logged in by checking local storage
    const jwt = localStorage.getItem('jwt');
    setIsLoggedIn(!!jwt);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    navigate('/');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onSignOut={handleLogout} />
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/all-stocks" element={<AllStocks/>} />
          {<Route path="/inventory" element={<Inventory/>} />}
          {<Route path="/orders" element={<Orders/>} />}
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/stocks/:symbol" element={<StockDetail />} />
          
        </Routes>
      </div>
      <footer style={{position:'fixed', left:0,  bottom: 0,   width: '100%'}}>
      <Footer/>
      </footer>

      
      
      </>
  );
};

export default App;
