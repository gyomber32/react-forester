import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={null} />
        <Route path="/auth" component={null} />
        <Route path="/seedlings" component={null} />
        <Route path="/seeds" component={null} />
      </BrowserRouter>
    </div>
  );
}

export default App;
