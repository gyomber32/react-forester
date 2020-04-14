import React from "react";

import styles from "./AddButton.module.scss";

type Props = {
  click: any;
};

const Button: React.FC<Props> = (props) => (
  <button className={styles.AddButton} onClick={props.click}>
    <i className={styles.AddButton___icon}></i>
  </button>
);

export default Button;
