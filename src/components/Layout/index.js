import React, { useState } from 'react';
import Header from '../Header';
import CookiesBar from '../CookiesBar';
import Tracker from '../Tracker';

const Column = ({ children }) => (
  <div className="column">
    {children}
    <style jsx>{`
      .column {
        margin: 0 0.25rem;
        padding: 1rem 0.25rem;
        flex-grow: 1;
        flex-basis: 0;
        min-width: 300px;
      }
    `}</style>
  </div>
);

const Layout = ({ children }) => {
  const [showCookieBar, setShowCookieBar] = useState(
    !localStorage.getItem('canTrack')
  );

  const onCookiesAccept = () => {
    localStorage.setItem('canTrack', 'yes');
    setShowCookieBar(false);
  };

  return (
    <div>
      {showCookieBar || <Tracker />}
      <Header />
      <div className="main">{children}</div>
      {showCookieBar && (
        <>
          <div className="pushDown" />
          <CookiesBar onAccept={onCookiesAccept} />
        </>
      )}
      <style jsx>{`
        .main {
          box-sizing: border-box;
          padding: 0 1rem;
          display: flex;
          justify-content: space-evenly;
        }

        .pushDown {
          height: 30vh;
          display: block;
        }

        @media (max-width: 600px) {
          .main {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export { Column };
export default Layout;
