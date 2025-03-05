import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const { handleLogin } = useContext(AuthContext); // Use the handleLogin function from the context

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/authenticate', {
        "username": username,
        "password": password
      });

      const { userId, jwt } = response.data;
      // Save user information in local storage
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('jwt', jwt);

      console.log("this is working");
      
      if (response.status === 200) {
        // Inventory creation request
        const inventory = await axios.get(`http://localhost:5000/inventory/all/${localStorage.getItem("userId")}`);
        localStorage.setItem("inventoryId", inventory.data[0].inventoryId);
        setMessage('Login successful!');
      }
      
      handleLogin(); // Notify the context of login success
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.log(error);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Login</h2>
        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
