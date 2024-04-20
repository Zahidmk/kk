import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";
import { db, doc, updateDoc, deleteDoc } from "../firebase"; // Import the necessary Firebase functions

const Popup = ({ selectedExpense, onClose }) => {
  const [editable, setEditable] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});

  // Update the edited expense state when the selected expense changes
  useEffect(() => {
    setEditedExpense(selectedExpense);
  }, [selectedExpense]);

  const handleEditClick = async () => {
    try {
      setEditable(!editable);
      // Check if editedExpense has the required properties
      if (
        editedExpense &&
        editedExpense.id &&
        editedExpense.invoice &&
        editedExpense.amount &&
        editedExpense.date &&
        editedExpense.imageUrl
      ) {
        const expenseRef = doc(db, "expenses", editedExpense.id);

        // Update the document based on the fields you want to change
        await updateDoc(expenseRef, {
          invoice: editedExpense.invoice,
          amount: editedExpense.amount,
          date: editedExpense.date,
          // Add more fields as needed
        });
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (editedExpense && editedExpense.id) {
        const expenseRef = doc(db, "expenses", editedExpense.id);
        await deleteDoc(expenseRef);
        onClose(); // Close the popup after deletion
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({
      ...editedExpense,
      [name]: value,
    });
  };
  console.log(editedExpense.imageUrl);
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
            name="invoice"
            value={editedExpense.invoice || ""}
            readOnly={!editable}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={editedExpense.amount || ""}
            readOnly={!editable}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={editedExpense.date || ""}
            readOnly={!editable}
            onChange={handleInputChange}
          />
        </div>
        <img
          href={editedExpense.imageUrl}
          className="o object-cover w-20 h-24"
        />
        <div>
          <button onClick={handleEditClick}>
            {editable ? "Save" : "Edit"}
          </button>
          {!editable && <button onClick={handleDeleteClick}>Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
