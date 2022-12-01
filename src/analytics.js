import ReactGA from 'react-ga';

console.log('analytics file run');

function Analytics() {
  let init = false;

  const tryInit = () => {
    if (
      process.env.REACT_APP_GA_TRACKING_ID &&
      localStorage.getItem('canTrack') === 'yes'
    ) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      ReactGA.set({ anonymizeIp: true });
      init = true;
      console.log('analytics init');
    }
  };

  tryInit();

  const curry = (func) => {
    return (...args) => {
      if (init) {
        console.log('analytics event:', args);
        return func(...args);
      }
      console.log('skipped (not init):', args);
      return null;
    };
  };

  return {
    pageview: curry(ReactGA.pageview),
    event: curry(ReactGA.event),
    isInit: () => init,
    tryInit,
  };
}

const analytics = Analytics();

export default analytics;
