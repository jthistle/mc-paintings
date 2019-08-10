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
