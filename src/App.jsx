import React, { useState } from "react";

import "./App.css";
import Top from "./Components/Top";
import ExpenceCalc from "./Components/ExpenceCalc";
import NewExpence from "./Components/NewExpence";

function App() {
  const addExpense = (newExpense) => {
    // Your logic to handle the new expense
    console.log("New Expense:", newExpense);
  };
  return (
    <>
      <main className=" flex gap-8 flex-col	 flex">
        <Top />
        <ExpenceCalc />
        <NewExpence onAddExpense={addExpense} />
      </main>
    </>
  );
}

export default App;
