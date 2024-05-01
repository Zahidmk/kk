import React, { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { MdCloudUpload, MdError } from "react-icons/md";
import { db, collection, addDoc } from "../firebase";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase"; // Import Firebase Storage functions

import styles from "./NewExpence.module.css";

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const NewExpense = ({ onAddExpense }) => {
  const [showForm, setShowForm] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [image, setImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddExpense = async () => {
    if (!invoice || !amount || !date) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const newExpense = {
      invoice,
      amount,
      date,
      imageUrl,
    };

    try {
      const docRef = await addDoc(collection(db, "expenses"), newExpense);

      onAddExpense(newExpense);

      setInvoice("");
      setAmount("");
      setDate(getCurrentDate());
      setImage(null);

      setIsSaved(true);

      setTimeout(() => {
        setIsSaved(false);
      }, 2000);

      setErrorMessage("");
    } catch (error) {
      console.error("Error adding expense to Firestore:", error);
      setErrorMessage("Error adding expense. Please try again.");
    }
  };

  const [iconRotation, setIconRotation] = useState(0);

  const handleButtonClick = () => {
    setShowForm(!showForm);
    setIconRotation((prevRotation) => (prevRotation + 45) % 360);
  };

  return (
    <div className="my-8">
      <button
        className={`${styles.btn_div_new} ${showForm ? styles.rotateIcon : ""}`}
        onClick={handleButtonClick}
      >
        {isSaved ? (
          <FcPlus
            size={65}
            style={{
              transform: `rotate(${iconRotation}deg)`,
              color: "red",
              transition: "transform 0.3s ease-in-out",
            }}
          />
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
          <h2 className="pb-4">Add the Expenses</h2>

          <form className={styles.exp_form}>
            <div>
              <label>Invoice No:</label>
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
              <input type="date" value={date} onChange={handleDateChange} />
              <label>Add Bill:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className="flex gap-3 mb-4 mt-3 ml-auto"
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
