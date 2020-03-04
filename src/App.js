import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/seedlings" component={null} />
          <Route path="/seeds" component={null} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
