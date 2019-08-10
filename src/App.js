import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Backers from './pages/Backers';
import DonationThank from './pages/DonationThank';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/*" />
        <Backers path="/backers" />
        <DonationThank path="/postdonation" />
      </Router>
    </div>
  );
}

export default App;
