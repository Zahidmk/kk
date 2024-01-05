import React from "react";
import styles from "./ExpenceCalc.module.css";
import ExpenseForm from "./ExpenseForm";

function ExpenceCalc() {
  return (
    <div className={styles.expence_main_div}>
      <div>
        <h3 className={styles.ExpenceCalc_h3}>Today, 4 Jan</h3>
        <div className={styles.expence_display}>
          <div className={styles.expence_display_flex}>
            <h3>Soya, savola, pottatto</h3>
            <span className={styles.exp_name}>By Zahid</span>
          </div>
          <div>
            <span className={styles.exp_price}>&#8377; 126</span>
          </div>
        </div>
        <div className={styles.expence_display}></div>
        <div className={styles.expence_display}></div>
        <h3 className={styles.ExpenceCalc_h3}>Today, 4 Jan</h3>
        <div className={styles.expence_display}>
          <div className={styles.expence_display_flex}>
            <h3>Soya, savola, pottatto</h3>
            <span className={styles.exp_name}>By Zahid</span>
          </div>
          <div>
            <span className={styles.exp_price}>&#8377; 126</span>
          </div>
        </div>
        <div className={styles.expence_display}></div>
        <div className={styles.expence_display}></div>

        <div className={styles.expence_display}></div>

        <div className={styles.expence_display}></div>

        <div className={styles.expence_display}></div>
        <div className={styles.expence_display}></div>
      </div>
    </div>
  );
}

export default ExpenceCalc;
