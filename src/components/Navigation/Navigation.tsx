import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import Logout from "../Logout/Logout";

import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => (
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  <header className={styles.MainNavigation}>
    <ul className={styles.MainNavigation__items}>
      <NavigationItem link="seedlings" exact={true}>
        Seedlings
      </NavigationItem>
      <NavigationItem link="seeds" exact={true}>
        Seeds
      </NavigationItem>
      <Logout link="auth" exact={true}>
        Logout
      </Logout>
    </ul>
  </header>
);

export default Navigation;
