import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Logout.module.scss";

interface Props {
  link: string;
  exact: boolean;
  children: string;
}
// has to be changed, when more functionality comes to the table, right now it's enough
const Logout = (props: Props) => (
  <li className={styles.Logout}>
    <NavLink to={props.link} exact={props.exact} className={styles.Logout_element}>
      {props.children}
    </NavLink>
  </li>
);

export default Logout;
