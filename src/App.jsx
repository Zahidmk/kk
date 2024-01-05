import React, { useState } from 'react';
import Top from './Components/Top';
import ExpenceCalc from './Components/ExpenceCalc';
import NewExpence from './Components/NewExpence';
import Login from './Login'; // Import the Login component
import { auth } from './firebase'; // Import the firebase configuration

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addExpense = (newExpense) => {
    // Your logic to handle the new expense
    console.log('New Expense:', newExpense);
  };

  // Check the user's login status when the component mounts
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      setIsLoggedIn(true);
    } else {
      // User is not logged in
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <main className="flex gap-8 flex-col flex">
        {/* Render components conditionally based on login status */}
        {isLoggedIn ? (
          <>
            <Top />
            <ExpenceCalc />
            <NewExpence onAddExpense={addExpense} />
          </>
        ) : (
          // Render the login component when not logged in
          <Login />
        )}
      </main>
    </>
  );
}

export default App;
