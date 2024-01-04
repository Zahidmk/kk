import React from "react";
import styles from "./Calender.module.css";
function Calender() {
  return (
    <div className={styles.cal_div}>
      <button className={styles.btn_calender}>This Month</button>
      <button className={styles.btn_calender1}>Last Month</button>
      <button className={styles.btn_calender2}>caalander</button>
    </div>
  );
}

export default Calender;
