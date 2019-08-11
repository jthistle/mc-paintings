/*
 *  Copyright (C) 2019 James Thistlewood
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

import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

const Tracker = () => {
  const [init, setInit] = useState(false);
  const pathName = window.location.pathname + window.location.search;

  useEffect(() => {
    if (
      process.env.REACT_APP_GA_TRACKING_ID &&
      localStorage.getItem('canTrack') === 'yes'
    ) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      ReactGA.set({ anonymizeIp: true });
      setInit(true);
    }
  }, []);

  useEffect(() => {
    if (init) {
      // Log page view
      ReactGA.pageview(pathName);
    }
  }, [init, pathName]);

  return <div />;
};

export default Tracker;