import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("jestinvj4@gmail.com");
  const [password, setPassword] = useState("1234567");
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

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error("Error signing in with email/password:", error.message);
      setError("Invalid email or password"); // Set an error message for the user
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login_form_sec">
      <div className="login_form">
        <h2>Welcome to KK</h2>
        <p>Sign in to continue</p>
        <form onSubmit={handleEmailLogin} className="login_form_controls">
          {/* Email and password fields */}
          <div className="flex flex-col">
            <label className="login_form_label">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login_form_input"
            />
          </div>
          <div className="flex flex-col">
            <label className="login_form_label">Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login_form_input"
            />
          </div>

          {/* Display error message if there is an error */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="login_submit_btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
