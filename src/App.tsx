import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

/* pages */
import AuthPage from "./pages/Authentication/Auth";
import SeedlingsPage from "./pages/Seedlings/Seedlings";
import SeedsPage from "./pages/Seeds/Seeds";
import MapPage from "./pages/Map/Map";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import styles from "./App.module.scss";
import IsAuthenticated from "./utils/IsAuthenticated";

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/" to="/auth" component={AuthPage} />
            <Route path="/auth" component={AuthPage} />
            <Route
              path="/seedlings"
              render={() =>
                IsAuthenticated() ? <SeedlingsPage /> : <Redirect to="/" />
              }
            />
            <Route
              path="/seeds"
              render={() =>
                IsAuthenticated() ? <SeedsPage /> : <Redirect to="/" />
              }
            />
            <Route
              path="/map"
              render={() =>
                IsAuthenticated() ? <MapPage /> : <Redirect to="/" />
              }
            />
            <Route
              path="*"
              render={() =>
                IsAuthenticated() ? <PageNotFound /> : <Redirect to="/" />
              }
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
