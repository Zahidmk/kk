import React from "react";
import styles from "./CashCard.module.css";
function CashCard() {
  return (
    <div className={styles.cashcard}>
      <div className={styles.CashCard_inner}>
        <h3 className={styles.cashcard_h3_exp}>Total Expence</h3>
        <span className={styles.cashcard_span_exp}>&#8377; 1365.52</span>
      </div> 
      <div className={styles.CashCard_inner}>
        <h3 className={styles.cashcard_h3_repay}>Remaining Payment</h3>
        <span className={styles.cashcard_span_repay}>&#8377; 1365.52</span>
      </div>
    </div>
  );
}

export default CashCard;
