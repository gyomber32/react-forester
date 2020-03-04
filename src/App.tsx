import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* pages */
import { AuthPage } from "./pages/Auth";

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
              <Route path="/" to="/auth" exact/>
              <Route path="/auth" component={AuthPage}/>
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
