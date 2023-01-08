/*
 *  Copyright (C) 2020 James Thistlewood
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

// disable target blank warning since affiliate links need referrer
/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import { Link } from '@reach/router';

import ReactGA from '../../analytics';

import {
  TWITTER,
  GITHUB,
  FEEDBACK,
  AFFILIATE_LINK,
} from '../../supportLinks.json';

export default ({ onClose }) => {
  return (
    <InfoPopup onReject={onClose}>
      <div className="partnerContainer">
        <div className="disclaimer">
          <Link to="/partnership" style={{ textDecoration: 'none' }}>
            <span className="disclaimerText">sponsored</span>
          </Link>
        </div>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          onClick={(e) =>
            ReactGA.event({
              category: 'Affiliate',
              action: 'Click',
              label: 'finish',
            })
          }
        >
          <div className="partnerLink">
            <img
              src="/res/affiliate_logo.webp"
              className="logo"
              alt="Affiliate logo"
            />
            <p className="headline">
              Your game server. Top performance. No monthly costs.
            </p>
            <p>Your own Minecraft server, for as little as $0.02/hour.</p>
            <p className="bolded">Try for free today.</p>
          </div>
        </a>
      </div>
      <div className="spacer"></div>
      <p>
        Thanks for using this website! Found a problem? Just want to say hi?
      </p>
      <Button external={FEEDBACK}>Give some feedback</Button>

      <p>Other ways to support:</p>
      <Button internal="/donate" scheme="yellow">
        Donate
      </Button>
      <Button external={TWITTER} scheme="tblue">
        Tweet about it
      </Button>
      <Button external={GITHUB} scheme="black">
        Star on GitHub
      </Button>

      <div className="break" />
      <style jsx>{`
        .highlight {
          font-weight: bold;
        }

        .spacer {
          height: 2rem;
        }

        .text {
          line-height: 1.5rem;
        }

        a {
          text-decoration: none;
        }

        .partnerContainer {
          display: inline-block;
          text-align: left;
        }

        .partnerLink {
          display: inline-block;
          padding: 1.5rem 1rem 1rem 1rem;
          border-radius: 0.25rem;
          color: white;
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.05);
          transition: background-color 0.3s;
          text-align: center;
        }

        .partnerLink:hover,
        .partnerLink:active {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .headline {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .bolded {
          font-weight: bold;
        }

        .logo {
          width: 100%;
          max-width: 20rem;
        }

        .disclaimer {
          width: 100%;
          text-align: left;
          margin-bottom: 0.2rem;
        }

        .disclaimerText {
          font-size: 0.8rem;
          color: #888;
          font-style: italic;
        }
      `}</style>
    </InfoPopup>
  );
};
