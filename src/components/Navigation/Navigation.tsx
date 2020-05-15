import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import styles from "./Navigation.module.scss";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
};

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
      <NavigationItem link="map" exact={true}>
        Map
      </NavigationItem>
      <NavigationItem link="auth" exact={true} click={logout}>
        Logout
      </NavigationItem>
    </ul>
  </header>
);

export default Navigation;
