import React from "react";

import styles from "./Popup.module.scss";

type Props = {
  message: string;
};

const Popup: React.FC<Props> = (props) => {
  return (
    <div className={styles.Popup}>
      <p className={styles.Popup_text}>{props.message}</p>
    </div>
  );
};

export default React.memo(Popup);
