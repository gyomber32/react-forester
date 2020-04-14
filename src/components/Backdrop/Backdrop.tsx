import React from "react";

import styles from "./Backdrop.module.scss";

type Props = {
  click?: any;
};

const Backdrop: React.FC<Props> = (props) => (
  <div onClick={props.click} className={styles.Backdrop}></div>
);

export default Backdrop;
