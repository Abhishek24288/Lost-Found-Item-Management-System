import { useState, useEffect } from 'react';
import axios from 'axios';

const API = "https://lost-found-item-management-system-67ll.onrender.com";

function Dashboard({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    contactInfo: ''
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/api/items`);
      setItems(res.data);
    } catch {
      setMsg("❌ Failed to load items");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/items`, form);
      setMsg("✅ Item added");
      setForm({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        contactInfo: ''
      });
      fetchItems();
    } catch {
      setMsg("❌ Error adding item");
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome {user?.name}</h2>
      <button onClick={onLogout}>Logout</button>

      <form onSubmit={addItem}>
        <input name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="contactInfo" placeholder="Contact" value={form.contactInfo} onChange={handleChange} />

        <select name="type" value={form.type} onChange={handleChange}>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <button>Add Item</button>
      </form>

      <p>{msg}</p>

      {items.map((i) => (
        <div key={i._id}>
          <b>{i.itemName}</b> ({i.type}) - {i.location}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;