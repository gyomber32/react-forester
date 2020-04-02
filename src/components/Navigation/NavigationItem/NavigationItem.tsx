import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css";

interface Props {
  link: string;
  exact: boolean;
  children: string;
}

const navigationItem = (props: Props) => (
  <li className="item_container">
    <NavLink to={props.link} exact={props.exact} className="item_element">
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
