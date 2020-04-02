import React from "react";

import "./Navigation.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigation = () => (
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  <header>
    <div className="main-navigation__container">
      <ul className="main-navigation__items">
        <NavigationItem link="Seedlings" exact>
          Seedlings
        </NavigationItem>
        <NavigationItem link="Seeds" exact>
          Seeds
        </NavigationItem>
      </ul>
    </div>
  </header>
);

export default navigation;
