import ReactGA from 'react-ga';

function Analytics() {
  let init = false;

  if (
    process.env.REACT_APP_GA_TRACKING_ID &&
    localStorage.getItem('canTrack') === 'yes'
  ) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.set({ anonymizeIp: true });
    init = true;
  }

  const curry = (func) => {
    return (...args) => {
      if (init) {
        return func(...args);
      }
      return null;
    };
  };

  return {
    pageview: curry(ReactGA.pageview),
    event: curry(ReactGA.event),
    isInit: () => init,
  };
}

const analytics = Analytics();

export default analytics;
