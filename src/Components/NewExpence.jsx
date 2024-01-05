import styles from "./NewExpence.module.css";
import { FcPlus } from "react-icons/fc";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const NewExpense = ({ onAddExpense }) => {
  const [showForm, setShowForm] = useState(false);
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  const handleAddExpense = () => {
    const newExpense = {
      expenseType,
      amount,
      category,
      date,
    };

    // Pass the new expense data to the parent component
    onAddExpense(newExpense);

    // Clear the form fields
    setExpenseType("");
    setAmount("");
    setCategory("food");
    setDate("");
  };

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
        <FcPlus
          size={55}
          style={{
            transform: `rotate(${iconRotation}deg)`,
            color: "red",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </button>
      {showForm && (
        <div className={styles.NewExpense_div}>
          <h2>Add the Expences</h2>
          <form>
            <label>
              Expense Type:
              <input
                type="text"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              />
            </label>

            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>

            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="food">Food</option>
                <option value="utilities">Utilities</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                {/* Add more categories as needed */}
              </select>
            </label>

            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <button
              className="flex gap-3"
              type="button"
              onClick={handleAddExpense}
              style={{
                backgroundColor: "#ffff",
                border:"none",
                color:"#34A853",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              Add
              <MdCloudUpload size={24} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewExpense;
