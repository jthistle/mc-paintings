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

import React, { useState } from 'react';
import Header from '../Header';
import CookiesBar from '../CookiesBar';
import Tracker from '../Tracker';

const PRIVACY_PATH = '/privacy';

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

        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </div>
);

const Layout = ({ captureHeader, children }) => {
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
      <Header capture={captureHeader} />
      <div className="main">{children}</div>
      {showCookieBar && window.location.pathname !== PRIVACY_PATH && (
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
