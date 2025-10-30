import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthModern.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ If already logged in, go directly to HomePage
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) navigate("/", { replace: true });
  }, [navigate]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter all fields");
      return;
    }

    // Save credentials to localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account created successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <div className="auth-container">
      {/* Left Section */}
      <div className="auth-left">
        <h1 className="logo">🌿 Herbal Healer</h1>
        <p>Join Herbal Healer to explore herbal wisdom and natural healing practices.</p>
      </div>

      {/* Right Section */}
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Sign Up
          </button>

          <div className="divider"></div>

          <Link to="/login" className="create-account-btn">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
