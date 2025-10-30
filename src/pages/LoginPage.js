import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthModern.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Prevent going back to login after login
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      navigate("/", { replace: true }); // already logged in
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      alert("Login successful!");
      navigate("/", { replace: true }); // ✅ Redirect to HomePage
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="logo">🌿 Herbal Healer</h1>
        <p>Connect naturally with wellness and balance in life.</p>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">Log In</button>

          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>

          <div className="divider"></div>

          <Link to="/signup" className="create-account-btn">
            Create new account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
