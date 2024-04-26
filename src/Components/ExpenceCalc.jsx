import React, { useState, useEffect } from "react";
import styles from "./ExpenceCalc.module.css";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Update the path accordingly
import Popup from "./Popup"; // Import the Popup component

function ExpenceCalc() {
  const [expensesByDate, setExpensesByDate] = useState({});
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const expensesCollection = collection(db, "expenses");

      const unsubscribe = onSnapshot(expensesCollection, (querySnapshot) => {
        const expensesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        expensesData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Group expenses by date
        const groupedExpenses = expensesData.reduce((acc, expense) => {
          const date = expense.date;
          acc[date] = acc[date] || [];
          acc[date].push(expense);

          return acc;
        }, {});

        setExpensesByDate(groupedExpenses);
      });

      // Cleanup function to unsubscribe from real-time updates
      return () => unsubscribe();
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const getDivColor = (amount) => {
    if (amount > 500) {
      return "#ff000015";
    } else if (amount < 200) {
      return "#00ff2215";
    } else {
      return "#ffaa0015";
    }
  };

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.expence_main_div}>
      {Object.keys(expensesByDate).map((date) => (
        <div key={date}>
          <h3 className={styles.ExpenceCalc_h3}>{date}</h3>
          {expensesByDate[date].map((expense) => (
            <div
              key={expense.id}
              className={styles.expence_display}
              style={{ backgroundColor: getDivColor(expense.amount) }}
              onClick={() => handleExpenseClick(expense)} // Add onClick handler
            >
              <div className={styles.expence_display_flex}>
                <h3>IN NO : {expense.invoice}</h3>
              </div>
              <div>
                <span className={styles.exp_price}>
                  &#8377;{expense.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
      {isPopupOpen && (
        <Popup selectedExpense={selectedExpense} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default ExpenceCalc;
