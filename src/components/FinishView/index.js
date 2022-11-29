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

import React from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';

import SponsorImage from './sponsor-logo.webp';

import {
  TWITTER,
  GITHUB,
  FEEDBACK,
  TWEET_AT,
  TWITTER_FOLLOW,
  AFFILIATE_LINK,
} from '../../supportLinks.json';
import { SINGLE_TEX_POSITIONS } from '../../pages/Home/configs';

export default ({ onClose }) => {
  return (
    <InfoPopup onReject={onClose}>
      <a href={AFFILIATE_LINK} target="_blank">
        <div className="partnerLink">
          {/* <p className="headline">Get your own Minecraft server, for as little as $0.02/hour!</p>
          <img src={SponsorImage} className="logo" />
          <p>Your game server. Top performance. No monthly costs.</p> */}
          <img src={SponsorImage} className="logo" />
          <p className="headline">
            Your game server. Top performance. No monthly costs.
          </p>
          <p>Your own Minecraft server, for as little as $0.02/hour.</p>
          <p className="bolded">Try for free today.</p>
        </div>
      </a>
      <p class="spacer">&nbsp;</p>
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
          margin-top: 4rem;
        }

        .text {
          line-height: 1.5rem;
        }

        a {
          text-decoration: none;
        }

        .partnerLink {
          display: inline-block;
          padding: 2rem;
          border-radius: 0.25rem;
          color: white;
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.05);
          transition: background-color 0.3s;
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
      `}</style>
    </InfoPopup>
  );
};
