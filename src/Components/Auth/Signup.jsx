import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Signup request
      const signupResponse = await axios.post('http://localhost:5000/auth/new', {
        name,
        email,
        password,
        roles: 'user'
      });
      
      if (signupResponse.status === 200) {
        // Inventory creation request
        await axios.post('http://localhost:5000/inventory/new', {
          userId: signupResponse.data.userId // assuming the response contains the user ID
        });

        setMessage('Signup successful! Inventory created. Please log in.');
      }
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Signup</h2>
        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
