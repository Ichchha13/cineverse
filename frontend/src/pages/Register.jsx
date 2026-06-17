import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    register(form.name, form.email, form.password);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎬 CineVerse</div>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join CineVerse and start booking</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />

          <label>Password (min 6 chars)</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create password" />

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="filter-select" style={{width:"100%",marginBottom:"1rem"}}>
            <option value="USER">User</option>
            <option value="THEATRE_OWNER">Theatre Owner</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
