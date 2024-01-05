import React, { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { MdCloudUpload, MdError } from "react-icons/md"; // Import MdError for displaying error icon
import { db, collection, addDoc } from "../firebase";

import styles from "./NewExpence.module.css";

const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

const NewExpense = ({ onAddExpense }) => {
  const [showForm, setShowForm] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const handleDateChange = (e) => {
    // Update the date state when the input value changes
    setDate(e.target.value);
  };

  const handleAddExpense = async () => {
    // Validate that required fields are not empty
    if (!invoice || !amount || !date) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const newExpense = {
      invoice,
      amount,
      date,
    };

    try {
      // Add the new expense data to Firestore
      const docRef = await addDoc(collection(db, "expenses"), newExpense);
      console.log()

      // Pass the new expense data to the parent component
      onAddExpense(newExpense);

      // Clear the form fields
      setInvoice("");
      setAmount("");
      setDate(getCurrentDate()); // Set the date to the current date again

      // Update the state to indicate that it's saved
      setIsSaved(true);

      // Reset the saved status after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);

      // Reset the error message
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding expense to Firestore:", error);
      setErrorMessage("Error adding expense. Please try again.");
    }
  };
//   const current = new Date();
//   const current_date = `${current.getDate()}/${
//     current.getMonth() + 1
//   }/${current.getFullYear()}`;
//   const [day, month, year] = current_date.split("/");
//   const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//     2,
//     "0"
//   )}`;


  const [iconRotation, setIconRotation] = useState(0);

  const handleButtonClick = () => {
    setShowForm(!showForm);

    setIconRotation((prevRotation) => (prevRotation + 45) % 360);
  };

  return (
    <div className="my-8 ">
      <button
        className={`${styles.btn_div_new} ${showForm ? styles.rotateIcon : ""}`}
        onClick={handleButtonClick}
      >
        {isSaved ? (
          <MdCloudUpload size={24} style={{ color: "green" }} />
        ) : (
          <FcPlus
            size={65}
            style={{
              transform: `rotate(${iconRotation}deg)`,
              color: "red",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        )}
      </button>
      {showForm && (
        <div className={styles.NewExpense_div}>
          <h2>Add the Expenses</h2>

          <form className={styles.exp_form}>
            <div>
              <label>Invoice No :</label>
              <input
                type="number"
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
              />
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
             <label>Date:</label>
              <input
        type="date"
        value={date}
        onChange={handleDateChange} // Add this onChange handler
      />
            </div>
            <button
              className="flex gap-3"
              type="button"
              onClick={handleAddExpense}
              style={{
                backgroundColor: "#ffff",
                border: "none",
                color: "#34A853",
                transition: "transform 0.3s ease-in-out",
                outline: "none !important",
                border: "none",
              }}
              disabled={isSaved}
            >
              {isSaved ? "Saved" : "Save"}
              {isSaved ? (
                <MdCloudUpload size={24} style={{ color: "green" }} />
              ) : (
                <MdCloudUpload size={24} />
              )}
            </button>

            <div></div>
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                <MdError size={20} style={{ marginBottom: "-3px" }} />
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NewExpense;
