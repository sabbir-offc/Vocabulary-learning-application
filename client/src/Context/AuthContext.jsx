import  { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data from localStorage
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Save user data to state
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
    localStorage.setItem("token", userData.token); // Store token in localStorage
  };

  const logout = () => {
    setUser(null); // Clear user data from state
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
