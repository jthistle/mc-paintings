import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Backers from './pages/Backers';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/*" />
        <Backers path="/backers" />
      </Router>
    </div>
  );
}

export default App;
