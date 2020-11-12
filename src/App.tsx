import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import TreesPage from "./pages/Trees/Trees";
import SeedlingsPage from "./pages/Seedlings/Seedlings";
import SeedsPage from "./pages/Seeds/Seeds";
import MapPage from "./pages/Map/Map";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
//import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import styles from "./App.module.scss";
import AuthPage from "./pages/Authentication/Auth";
import { useAuth, useAuthorization } from "./hooks";

const App = () => {
  const authorize = useAuthorization();
  const isLoggedIn = useAuth();

  useEffect(() => {
    authorize();
  });

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/trees" />
                ) : (
                  <Route to="/auth" component={AuthPage} />
                )
              }
            />
            <Route
              path="/auth"
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/trees" />
                ) : (
                  <Route to="/auth" component={AuthPage} />
                )
              }
            />
            <Route
              path="/trees"
              render={() =>
                isLoggedIn ? <TreesPage /> : <Redirect to="/auth" />
              }
            />
            <Route
              path="/seedlings"
              render={() =>
                isLoggedIn ? <SeedlingsPage /> : <Redirect to="/auth" />
              }
            />
            <Route
              path="/seeds"
              render={() =>
                isLoggedIn ? <SeedsPage /> : <Redirect to="/auth" />
              }
            />
            <Route
              path="/map"
              render={() =>
                isLoggedIn ? <MapPage /> : <Redirect to="/auth" />
              }
            />
            <Route
              path="*"
              render={() =>
                isLoggedIn ? <PageNotFound /> : <Redirect to="/auth" />
              }
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
