import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Top from './Components/Top';
import ExpenceCalc from './Components/ExpenceCalc';
import NewExpence from './Components/NewExpence';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const addExpense = (newExpense) => {
    // Your logic to handle the new expense
    console.log('New Expense:', newExpense);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Display a loading indicator while checking authentication state
  if (isCheckingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <>
                <Top />
                <ExpenceCalc />
                <NewExpence onAddExpense={addExpense} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/home' : '/login'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
