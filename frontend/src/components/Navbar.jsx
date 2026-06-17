import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">🎬 CineVerse</Link>
      <div className="nav-links">
        <Link to="/">Movies</Link>
        {user && <Link to="/my-bookings">My Bookings</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {user ? (
          <div className="nav-user">
            <span className="nav-username">👤 {user.name}</span>
            <span className="nav-role-badge">{user.role}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="btn-nav-login">Login</Link>
            <Link to="/register" className="btn-nav-register">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
