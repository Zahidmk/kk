import React, { useState, useEffect, useRef } from "react"; // Added 'useRef' import
import styles from "./CashCard.module.css";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./../../firebase";

function CashCard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingExpense, setRemainingExpense] = useState(0); // Added 'remainingExpense' state
  const totalExpenseRef = useRef(null); // Added 'totalExpenseRef' useRef
  const remainingExpenseRef = useRef(null); // Added 'remainingExpenseRef' useRef

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesCollection = collection(db, "expenses");
        const unsubscribe = onSnapshot(expensesCollection, (querySnapshot) => {
          const expensesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Get the current month and year
          const today = new Date();
          const currentMonth = today.getMonth() + 1; // Months are 0-based
          const currentYear = today.getFullYear();

          // Filter expenses for the current month and year
          const currentMonthExpenses = expensesData.filter(
            (expense) =>
              new Date(expense.date).getMonth() + 1 === currentMonth &&
              new Date(expense.date).getFullYear() === currentYear
          );

          // Calculate the sum of amounts for the current month
          const sum = currentMonthExpenses.reduce(
            (acc, expense) => acc + parseFloat(expense.amount),
            0
          );

          setTotalExpense(sum.toFixed(2));
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData();
  }, []); // Removed the dependency array to run only once

  // Function to update remaining expense when repayment is made
  const handleRepayment = (repaymentAmount) => {
    const updatedRemaining = totalExpense - repaymentAmount;
    setRemainingExpense(updatedRemaining.toFixed(2));
  };

  useEffect(() => {
    const adjustFontSize = (ref) => {
      if (ref.current) {
        const spanElement = ref.current.querySelector("span");
        spanElement.style.fontSize = "24px";
      }
    };

    adjustFontSize(totalExpenseRef);
    adjustFontSize(remainingExpenseRef);

    const handleResize = () => {
      // Changed the function name to 'handleResize'
      adjustFontSize(totalExpenseRef);
      adjustFontSize(remainingExpenseRef);
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalExpense, remainingExpense]); // Added 'totalExpense' and 'remainingExpense' to the dependency array

  return (
    <div className={styles.cashcard}>
      <div className={styles.CashCard_inner} ref={totalExpenseRef}>
        <h3 className={styles.cashcard_h3_exp}>Total Expense</h3>
        <span className={styles.cashcard_span_exp} style={{ fontSize: "24px" }}>
          &#8377; {totalExpense}
        </span>
      </div>
      {/* Remaining Payment component */}
      <div className={styles.CashCard_inner} ref={remainingExpenseRef}>
        <h3 className={styles.cashcard_h3_repay}>Remaining Payment</h3>
        <span
          className={styles.cashcard_span_repay}
          style={{ fontSize: "24px" }}
        >
          &#8377; {remainingExpense}
        </span>
      </div>
    </div>
  );
}

export default CashCard;
