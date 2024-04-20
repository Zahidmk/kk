import React, { useState, useEffect } from "react";
import styles from "./Calender.module.css";
import CashCard from "./CashCard"; // Import CashCard component
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

function Calender() {
  const [selectedMonth, setSelectedMonth] = useState(""); // State to track selected month
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date for calendar

  useEffect(() => {
    // Function to get current month in MM format (e.g., "01" for January)
    const getCurrentMonth = () => {
      const today = new Date();
      return String(today.getMonth() + 1).padStart(2, "0");
    };

    setSelectedMonth(getCurrentMonth()); // Set selected month to current month when component mounts
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  useEffect(() => {
    // Function to get the first day of the current month
    const getFirstDayOfMonth = () => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    };

    setSelectedDate(getFirstDayOfMonth()); // Set selected date to the first day of the current month when component mounts
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedMonth = String(date.getMonth() + 1).padStart(2, "0");
    setSelectedMonth(selectedMonth);
  };

  return (
    <div>
      <div className={styles.cal_div}>
        <button
          className={styles.btn_calender}
          onClick={() => handleMonthClick("this")}
        >
          This Month
        </button>
        <button
          className={styles.btn_calender1}
          onClick={() => handleMonthClick("last")}
        >
          Last Month
        </button>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className={styles.btn_calender2}
          placeholderText="Calendar"
        />
        {/* Calendar button */}
      </div>
      <CashCard selectedMonth={selectedMonth} />{" "}
      {/* Pass selectedMonth as prop */}
    </div>
  );
}

export default Calender;
