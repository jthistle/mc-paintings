/*
 *  Copyright (C) 2022 James Thistlewood
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Guide from './pages/Guide';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Privacy path="/privacy" />
        <About path="/about" />
        <Guide path="/guide" />
        <Contact path="/contact" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
