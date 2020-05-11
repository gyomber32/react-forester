import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Logout.module.scss";

type Props = {
  link: string;
  exact: boolean;
  children: string;
  click: any;
};

const Logout: React.FC<Props> = (props) => {
  return (
    <li className={styles.Logout} onClick={props.click}>
      <NavLink
        to={props.link}
        exact={props.exact}
        className={styles.Logout_element}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default Logout;
