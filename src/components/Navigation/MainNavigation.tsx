import React from "react";
import { NavLink } from "react-router-dom";

export const MainNavigation: React.FC = () => (
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  <header>
    <div className="main-navigation__logo">
      <h1>The Navbar</h1>
    </div>
    <div className="main-navigation__item">
      <ul>
        <li>
          <NavLink to="/seedlings">Seedlings</NavLink>
        </li>
        <li>
          <NavLink to="/seeds">Seeds</NavLink>
        </li>
      </ul>
    </div>
  </header>
);
