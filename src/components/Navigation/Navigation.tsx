import React from "react";

import "./Navigation.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Logout from "../Logout/Logout";

const navigation = () => (
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  <header>
    <div className="main-navigation__container">
      <ul className="main-navigation__items">
        <NavigationItem link="seedlings" exact>
          Seedlings
        </NavigationItem>
        <NavigationItem link="seeds" exact>
          Seeds
        </NavigationItem>
        <Logout link="auth" exact>
          Logout
        </Logout>
      </ul>
    </div>
  </header>
);

export default navigation;
