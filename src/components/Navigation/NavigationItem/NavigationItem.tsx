import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavigationItem.module.scss";

type Props = {
  link: string;
  exact: boolean;
  children: string;
  click?: any;
}

const NavigationItem: React.FC<Props> = (props) => (
  <li className={styles.NavigationItem} onClick={props.click}>
    <NavLink
      to={props.link}
      exact={props.exact}
      className={styles.NavigationItem_element}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
