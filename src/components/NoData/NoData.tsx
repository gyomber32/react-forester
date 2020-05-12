import React from "react";

import styles from "./NoData.module.scss";

type Props = {
  children: string;
};

const Navigation: React.FC = (props) => (
  <div className={styles.NoData}>
    <h1 className={styles.NoData_text}>
      There are no {props.children} in the database. Plant at least one tree, click on the add button in the bottom right corner and <b> You will leave the world better place than you have found it!</b>
    </h1>
  </div>
);

export default Navigation;
