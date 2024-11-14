import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {

  const { user , login } = useContext(UserContext) ?? {};

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("נא למלא את כל השדות");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const success = await login!(username, password);      
      if (success) {
        navigate('/')
      } else {
        setError("שם משתמש או סיסמה לא נכונים");
        setPassword("");
      }
    } catch (err) {
      setError("אירעה שגיאה בהתחברות. אנא נסה שנית");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              dir="ltr"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
