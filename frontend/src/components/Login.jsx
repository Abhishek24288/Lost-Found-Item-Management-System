import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://lost-found-item-management-system-67ll.onrender.com';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // INPUT HANDLE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/login`,
        formData
      );

      const { token, user } = res.data;

      // TOKEN SAVE
      localStorage.setItem('token', token);

      // HEADER SET (IMPORTANT)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // APP KO DATA BHEJNA
      onLoginSuccess(token, user);

    } catch (err) {
      setMessage(
        err.response?.data?.message || '❌ Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      {message && <p className="error">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;