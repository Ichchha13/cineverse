import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cineverse_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Mock JWT simulation — accept any credentials
    const mockUser = {
      id: "u1",
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "ADMIN" : "USER",
      token: "mock-jwt-token-" + Date.now(),
    };
    setUser(mockUser);
    localStorage.setItem("cineverse_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const register = (name, email, password) => {
    const mockUser = {
      id: "u" + Date.now(),
      name,
      email,
      role: "USER",
      token: "mock-jwt-token-" + Date.now(),
    };
    setUser(mockUser);
    localStorage.setItem("cineverse_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cineverse_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
