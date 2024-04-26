import React, { useState } from "react";
import styles from "./Top.module.css";
import Calender from "./month/Calender";
import CashCard from "./month/CashCard";
import { DrawerDiv } from "./Drawer";
import { auth } from "../firebase";

function Top() {
  const [showPopup, setShowPopup] = useState(false);
  const handleLogout = () => {
    // Show the confirmation popup
    setShowPopup(true);
    confirmLogout();
  };

  const confirmLogout = () => {
    // Perform logout action
    auth.signOut();

    // Hide the confirmation popup after logout
    setShowPopup(false);
  };

  // const cancelLogout = () => {
  //   setShowPopup(false);
  // };

  return (
    <div className={styles.topbg}>
      <div className={styles.inner_div}>
        <h1 className={styles.header}>KK Expense</h1>
        <button className={styles.btn_header} onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <DrawerDiv showPopup={showPopup} onClose={handleLogout} />
      </div>
      <Calender />
    </div>
  );
}

export default Top;
