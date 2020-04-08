import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavigationItem.module.scss";

interface Props {
  link: string;
  exact: boolean;
  children: string;
}

const navigationItem = (props: Props) => (
  <li className={styles.NavigationItem}>
    <NavLink to={props.link} exact={props.exact} className={styles.NavigationItem_element}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
