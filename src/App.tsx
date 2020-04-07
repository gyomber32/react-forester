import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* pages */
import { AuthPage } from "./pages/authentication/Auth";
import { SeedlingsPage } from "./pages/seedlings/Seedlings";
import { SeedsPage } from "./pages/seeds/Seeds";

/* components */
import Navigation  from "./components/Navigation/Navigation";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact={true} path="/" to="/auth" />
            <Route path="/auth" component={AuthPage} />
            <Route path="/seedlings" component={SeedlingsPage} />
            <Route path="/seeds" component={SeedsPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
