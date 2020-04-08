import React from "react";

import styles from "./AddButton.module.scss";

interface Props {
  click: any;
}

const Button = (props: Props) => {
  return (
    <button className={styles.AddButton} onClick={props.click}>
      <i className={styles.AddButton___icon }></i>
    </button>
  );
};

export default Button;
