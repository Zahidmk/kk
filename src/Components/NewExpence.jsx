// import React from "react";
import styles from "./NewExpence.module.css";
import { FcPlus } from "react-icons/fc";

// function NewExpence() {
//   return (
//     <div className={styles.new_exp_btn_div}>
//         <button className={styles.btn_div_new}>
//       <FcPlus size={55}/>
//         </button>
//     </div>
//   );
// }

// export default NewExpence;

// NewExpense.js
import React, { useState } from "react";

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

  return (
    <div className="my-8 ">
      <button
        className={styles.btn_div_new}
        onClick={() => setShowForm(!showForm)}
      >
        <FcPlus size={55} />
      </button>
      {showForm && (
      <div className={styles.NewExpense_div}>
        
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

            <button type="button" onClick={handleAddExpense}>
              Add Expense
            </button>
          </form>
        
      </div>
      )}
    </div>
  );
};

export default NewExpense;
