import { useState, useEffect } from 'react';
import axios from 'axios';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 PAGE LOAD PAR TOKEN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  // 🔥 LOGIN SUCCESS
  const handleLoginSuccess = (token, userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="app">
      <h1>📦 Lost & Found Management System</h1>

      {!isLoggedIn ? (
        <div className="container">
          <Register />
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;