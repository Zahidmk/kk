import React, { useState } from "react";
import styles from "./Top.module.css";
import Calender from "./month/Calender";
import CashCard from "./month/CashCard";
import { Button, Drawer } from "flowbite-react";
import { auth } from "../firebase";
function Top() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleLogout = () => {
    confirmLogout();
  };
  const confirmLogout = () => {
    auth.signOut();
  };
  return (
    <div className={styles.topbg}>
      <div className={styles.inner_div}>
        <h1 className={styles.header}>KK Expense</h1>
        <button className={styles.btn_header} onClick={() => setIsOpen(true)}>
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
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <Drawer.Header title="KK Expense" />
          <Drawer.Items>
            <button onClick={handleLogout}>Log Out</button>
          </Drawer.Items>
        </Drawer>
      </div>
      <Calender />
    </div>
  );
}

export default Top;
