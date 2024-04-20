import React, { useState, useEffect, useRef } from "react";
import styles from "./CashCard.module.css";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./../../firebase";

function CashCard() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingExpense, setRemainingExpense] = useState(0);
  const totalExpenseRef = useRef(null);
  const remainingExpenseRef = useRef(null);
  const thresholdWidth = 200; // Adjust the value as needed

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
  }, []);

  useEffect(() => {
    // Calculate remaining expense
    const remainingExpenseAmount = totalExpense - remainingExpense;

    setRemainingExpense(remainingExpenseAmount.toFixed(2));
  }, [totalExpense]);

  useEffect(() => {
    const adjustFontSize = (ref) => {
      if (ref.current) {
        const divWidth = ref.current.offsetWidth;
        const spanElement = ref.current.querySelector("span");
        if (divWidth < thresholdWidth) {
          spanElement.style.fontSize = "smaller";
        } else {
          spanElement.style.fontSize = "inherit";
        }
      }
    };

    adjustFontSize(totalExpenseRef);
    adjustFontSize(remainingExpenseRef);

    // Re-adjust font size on window resize
    window.addEventListener("resize", () => {
      adjustFontSize(totalExpenseRef);
      adjustFontSize(remainingExpenseRef);
    });

    return () => {
      window.removeEventListener("resize", () => {
        adjustFontSize(totalExpenseRef);
        adjustFontSize(remainingExpenseRef);
      });
    };
  }, [totalExpense, remainingExpense]); // Include totalExpense and remainingExpense in dependency array

  return (
    <div className={styles.cashcard}>
      <div className={styles.CashCard_inner} ref={totalExpenseRef}>
        <h3 className={styles.cashcard_h3_exp}>Total Expense</h3>
        <span className={styles.cashcard_span_exp}>&#8377; {totalExpense}</span>
      </div>
      {/* Remaining Payment component */}
      <div className={styles.CashCard_inner} ref={remainingExpenseRef}>
        <h3 className={styles.cashcard_h3_repay}>Remaining Payment</h3>
        <span className={styles.cashcard_span_repay}>
          &#8377; {remainingExpense}
        </span>
      </div>
    </div>
  );
}

export default CashCard;
