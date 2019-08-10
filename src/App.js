import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Backers from './pages/Backers';
import DonationThank from './pages/DonationThank';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/*" />
        <Backers path="/backers" />
        <DonationThank path="/postdonation" />
        <Privacy path="/privacy" />
      </Router>
    </div>
  );
}

export default App;
