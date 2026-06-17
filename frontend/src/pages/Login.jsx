import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    login(email, password);
    navigate("/");
  };

  const fillDemo = (role) => {
    if (role === "user") { setEmail("user@cineverse.com"); setPassword("password123"); }
    else { setEmail("admin@cineverse.com"); setPassword("admin123"); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎬 CineVerse</div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to book your favourite movies</p>

        <div className="demo-btns">
          <button onClick={() => fillDemo("user")} className="btn-demo">Demo User</button>
          <button onClick={() => fillDemo("admin")} className="btn-demo">Demo Admin</button>
        </div>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="auth-info">
          <p>🔐 JWT Token stored in localStorage</p>
          <p>👮 Role-Based Access: USER / ADMIN</p>
        </div>

        <p className="auth-switch">Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
}
