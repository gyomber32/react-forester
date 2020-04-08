import React from "react";

import styles from "./Backdrop.module.scss";

interface Props {
  click: any;
}

const backdrop = (props: Props) => (
  <div onClick={props.click} className={styles.Backdrop}></div>
);

export default backdrop;
