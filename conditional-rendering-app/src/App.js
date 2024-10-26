// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Effect to check if login state is saved in localStorage and is still valid
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData) {
      const { isLoggedIn, timestamp } = loginData;
      const currentTime = new Date().getTime();
      const oneMinute = 60 * 1000;//session time set

      // If login data exists and hasn't expired, set user as logged in
      if (isLoggedIn && currentTime - timestamp < oneMinute) {
        setIsLoggedIn(true);
        setUsername(loginData.username); // Restore the username for display
      } else {
        localStorage.removeItem("loginData"); // Clear expired login data
      }
    }
  }, []);

  // Function to handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation for username and password
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      setError("");

      // Save login state to localStorage with timestamp
      const loginData = {
        isLoggedIn: true,
        username,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("loginData", JSON.stringify(loginData));
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("loginData");
  };

  return (
    <div className="App">
      <h1>Sign-In Page</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default App;
