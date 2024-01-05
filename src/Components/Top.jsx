import React from "react";
import styles from "./Top.module.css";
import Calender from "./month/Calender";
import CashCard from "./month/CashCard";
function Top() {
  return (
    <div className={styles.topbg}>
      <div className={styles.inner_div}>
        <h1 className={styles.header}>KK Expence</h1>
        <button className={styles.btn_header}>
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
      </div>
      <Calender/>
      <CashCard/>
          </div>
  );
}

export default Top;
