import React, { Fragment } from "react";

import styles from "./PageNotFound.module.scss";

const PageNotFound: React.FC = () => {
  return (
    <div className={styles.PageNotFound}>
      <h1>Page Not Found</h1>
      <div className={styles.PageNotFound_img}></div>
      <p className={styles.PageNotFound_text}>Sir, I'm gonna have to ask you to exit the donut!</p>
    </div>
  );
};

export default PageNotFound;
