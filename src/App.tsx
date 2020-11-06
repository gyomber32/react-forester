import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthPage from "./pages/Authentication/Auth";
import TreesPage from "./pages/Trees/Trees";
import SeedlingsPage from "./pages/Seedlings/Seedlings";
import SeedsPage from "./pages/Seeds/Seeds";
import MapPage from "./pages/Map/Map";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/" component={TreesPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/trees" component={TreesPage} />
            <Route path="/seedlings" component={SeedlingsPage} />
            <Route path="/seeds" component={SeedsPage} />
            <Route path="/map" component={MapPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
