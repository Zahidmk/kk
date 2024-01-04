import React from "react";
import styles from "./Top.module.css";
function Top() {
  return (
    <div className={styles.topbg}>
      <h1 className={styles.header}>KK Expence</h1>
      <button>Menu</button>
    </div>
  );
}

export default Top;
