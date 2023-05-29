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

import { TWITTER, GITHUB, FEEDBACK } from '../../supportLinks.json';
import ReactGA from '../../analytics';

export default ({ onClose }) => {
  const kofiHandler = (e) => {
    ReactGA.donateClick('finish', '');
  };

  return (
    <InfoPopup onReject={onClose}>
      <p className="larger">Thanks for using mcpaintings.com!</p>
      <p>This website is free for you, but not for me.</p>
      <p>If you can spare it, please</p>
      <div
        className="kofi"
        dangerouslySetInnerHTML={{ __html: window.kofiwidget2.getHTML() }}
        onClick={kofiHandler}
      />
      <p>Found a problem? Just want to say hi?</p>
      <Button external={FEEDBACK}>Give some feedback</Button>
      <p>Other ways to support:</p>
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

        .kofi {
          margin: 2rem 0;
        }

        .larger {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 3rem;
        }
      `}</style>
    </InfoPopup>
  );
};
