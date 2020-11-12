import React from "react";
import { useLogout } from "../../hooks/auth";
import NavigationItem from "./NavigationItem/NavigationItem";

import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const logout = useLogout();

  return (
    <header className={styles.MainNavigation}>
      <ul className={styles.MainNavigation__items}>
        <NavigationItem link="trees" exact={true}>
          Trees
        </NavigationItem>
        <NavigationItem link="seedlings" exact={true}>
          Seedlings
        </NavigationItem>
        <NavigationItem link="seeds" exact={true}>
          Seeds
        </NavigationItem>
        <NavigationItem link="map" exact={true}>
          Map
        </NavigationItem>
        <NavigationItem link="login" exact={true} click={() => logout()}>
          Logout
        </NavigationItem>
      </ul>
    </header>
  );
};

export default Navigation;
