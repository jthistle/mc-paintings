import ReactGALegacy from 'react-ga';
import ReactGA from 'react-ga4';

const debug = (...args) => false && console.log(...args);

debug('analytics file run');

function Analytics() {
  let init = false;

  const tryInit = () => {
    if (init) return;

    if (
      process.env.REACT_APP_GA_TRACKING_ID &&
      localStorage.getItem('canTrack') === 'yes'
    ) {
      // legacy init
      ReactGALegacy.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      ReactGALegacy.set({ anonymizeIp: true });

      // ga4 init
      ReactGA.initialize(process.env.REACT_APP_GA4_TRACKING_ID, {
        gaOptions: { anonymizeIp: true },
      });
      init = true;

      debug(
        `analytics init with ids ${process.env.REACT_APP_GA_TRACKING_ID} and ${process.env.REACT_APP_GA4_TRACKING_ID}`
      );
    }
  };

  tryInit();

  const curry = (func) => {
    return (...args) => {
      if (init) {
        debug('analytics function call:', args);
        return func(...args);
      }
      debug('analytics function call (not sent):', args);
      return null;
    };
  };

  const pageview = (path) => {
    ReactGALegacy.pageview(path);
    ReactGA.send({ hitType: 'pageview', page: path });
  };

  const event = (opts) => {
    ReactGALegacy.event(opts);
    ReactGA.event(opts);
  };

  return {
    pageview: curry(pageview),
    event: curry(event),
    isInit: () => init,
    tryInit,
  };
}

const analytics = Analytics();

export default analytics;
