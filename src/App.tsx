import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* pages */
import AuthPage from "./pages/Authentication/Auth";
import SeedlingsPage from "./pages/Seedlings/Seedlings";
import SeedsPage from "./pages/Seeds/Seeds";
import MapPage from "./pages/Map/Map";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/" to="/auth" component={AuthPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/seedlings" component={SeedlingsPage} />
            <Route path="/seeds" component={SeedsPage} />
            <Route path="/map" component={MapPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
