import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";
const Login = () => {
  const [email, setEmail] = useState("jestinvj4@gmail.com");
  const [password, setPassword] = useState("1234567");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login, you can redirect to the home page or perform other actions
    } catch (error) {
      console.error("Error signing in with email/password:", error.message);
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

          <button type="submit" className="login_submit_btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
