// CashCard.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./CashCard.module.css";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./../../firebase";

function CashCard({ selectedMonth }) {
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingExpense, setRemainingExpense] = useState(0);
  const totalExpenseRef = useRef(null);
  const remainingExpenseRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesCollection = collection(db, "expenses");
        const unsubscribe = onSnapshot(expensesCollection, (querySnapshot) => {
          const expensesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Filter expenses for the selected month
          const filteredExpenses = expensesData.filter((expense) => {
            const expenseMonth = new Date(expense.date).getMonth() + 1;
            return (
              (selectedMonth === "this" &&
                expenseMonth === new Date().getMonth() + 1) ||
              (selectedMonth === "last" &&
                expenseMonth === new Date().getMonth())
            );
          });

          const sum = filteredExpenses.reduce(
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
  }, [selectedMonth]);
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
      {/* Total Expense component */}
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
