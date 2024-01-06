import React, { useState } from "react";
import styles from "./Popup.module.css";
import { db, doc, updateDoc } from "../firebase"; // Import the necessary Firebase functions

const Popup = ({ invoice, amount, imageUrl, date, onClose }) => {
  const [editable, setEditable] = useState(false);

  const handleEditClick = async () => {
    try {
      setEditable(!editable);
      console.log("Selected Expense in Edit Click:", selectedExpense);


      console.log("Selected Expense:", selectedExpense);

      // Check if selectedExpense is defined and has the required properties
      if (
        selectedExpense &&
        selectedExpense.id &&
        selectedExpense.invoice &&
        selectedExpense.amount &&
        selectedExpense.date
      ) {
        const expenseRef = doc(db, "expenses", selectedExpense.id);

        // Update the document based on the fields you want to change
        await updateDoc(expenseRef, {
          invoice: selectedExpense.invoice,
          amount: selectedExpense.amount,
          date: selectedExpense.date,
          // Add more fields as needed
        });
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_content}>
        <span className={styles.close_button} onClick={onClose}>
          &times;
        </span>
        <h2>{editable ? "Edit" : "View"} Expense</h2>
        <div>
          <label>Invoice No:</label>
          <input
            type="text"
            value={invoice || ""}  // Ensure to handle null or undefined values
            readOnly={!editable}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount || ""}
            readOnly={!editable}
          />
        </div>
        <div>
          <label>Image:</label>
          <img
            src={imageUrl || ""}
            alt="Expense"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date || ""}
            readOnly={!editable}
          />
        </div>
        <div>
          <button onClick={handleEditClick}>
            {editable ? "Save" : "Edit"}
          </button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
