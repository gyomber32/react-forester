import React, { Suspense, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthPage from "./pages/Authentication/Auth";
import SeedlingsPage from "./pages/Seedlings/Seedlings";
import SeedsPage from "./pages/Seeds/Seeds";

import Backdrop from "./components/Backdrop/Backdrop";
import Spinner from "./components/Spinner/Spinner";

import IsAuthenticated from "./utils/IsAuthenticated";

import styles from "./App.module.scss";

const MapPage = React.lazy(() => import("./pages/Map/Map"));
const PageNotFound = React.lazy(() =>
  import("./pages/PageNotFound/PageNotFound")
);

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
                IsAuthenticated() ? (
                  <Suspense
                    fallback={
                      <Fragment>
                        <Backdrop />
                        <Spinner />
                      </Fragment>
                    }
                  >
                    <MapPage />
                  </Suspense>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="*"
              render={() =>
                IsAuthenticated() ? (
                  <Suspense
                    fallback={
                      <Fragment>
                        <Backdrop />
                        <Spinner />
                      </Fragment>
                    }
                  >
                    <PageNotFound />
                  </Suspense>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
