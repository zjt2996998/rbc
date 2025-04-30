import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import LoginForm from "./components/LoginForm";
import MessageList from "./components/MessageList";
import { DecodedToken } from "./types";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwt_decode<DecodedToken>(savedToken);
        setToken(savedToken);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid saved token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    try {
      const decoded = jwt_decode<DecodedToken>(newToken);
      setToken(newToken);
      setRole(decoded.role);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Failed to decode token");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setRole("");
    localStorage.removeItem("token");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {token ? (
        <>
          <button
            onClick={handleLogout}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
          <MessageList token={token} role={role} />
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
