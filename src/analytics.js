import ReactGA from 'react-ga';

const debug = (...args) => false && console.log(args);

debug('analytics file run');

function Analytics() {
  let init = false;

  const tryInit = () => {
    if (init) return;

    if (
      process.env.REACT_APP_GA_TRACKING_ID &&
      localStorage.getItem('canTrack') === 'yes'
    ) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      ReactGA.set({ anonymizeIp: true });
      init = true;
      debug('analytics init');
    }
  };

  tryInit();

  const curry = (func) => {
    return (...args) => {
      if (init) {
        debug('analytics event:', args);
        return func(...args);
      }
      debug('analytics event (not sent):', args);
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
