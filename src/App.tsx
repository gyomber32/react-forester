import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* components */
import { MainNavigation } from "./components/Navigation/MainNavigation";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <main>
            <Switch>
              <Route path="/" />
              <Route path="/auth" />
              <Route path="/seedlings" />
              <Route path="/seeds" />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
