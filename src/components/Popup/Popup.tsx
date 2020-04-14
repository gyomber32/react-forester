import React from "react";

import styles from "./Popup.module.scss";

type Props = {
  children: string;
};

const Popup: React.FC<Props> = (props) => {
  return (
    <div className={styles.Popup}>
      <p className={styles.Popup_text}>{props.children}</p>
    </div>
  );
};

export default Popup;
