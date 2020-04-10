import React from "react";

import styles from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return (
    <div className={styles.Spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
