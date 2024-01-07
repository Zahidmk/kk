import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import "./App.css";
import logo from "../src/assets/kk-logo.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // If user is already logged in, redirect to home page
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // Successful signup
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError("Error signing up. Please try again."); // Set an error message for the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup_form_sec">
      <div className="signup_form">
        <img src={logo} alt="" style={{ width: '150px' }} />
        <h2>Welcome to KK</h2>
        <p>Create an account to get started</p>
        <form onSubmit={handleSignUp} className="signup_form_controls">
          {/* Email, password, and confirm password fields */}
          <div className="flex flex-col">
            <label className="signup_form_label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup_form_input"
            />
          </div>
          <div className="flex flex-col">
            <label className="signup_form_label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup_form_input"
            />
          </div>
          <div className="flex flex-col">
            <label className="signup_form_label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="signup_form_input"
            />
          </div>

          {/* Display error message if there is an error */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="signup_submit_btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
