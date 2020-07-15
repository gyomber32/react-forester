import React from "react";

import styles from "./Backdrop.module.scss";

type Props = {
  click?: any;
  zIndex?: number;
};

const Backdrop: React.FC<Props> = (props) => (
  <div
    onClick={props.click}
    className={styles.Backdrop}
    style={{ zIndex: props.zIndex ? props.zIndex : 1 }}
  ></div>
);

export default Backdrop;
