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

export default ({ onClose }) => {
  return (
    <InfoPopup onReject={onClose}>
      <p>
        <b>This website exists thanks to donations from people like you.</b>
      </p>
      <Button big internal="/donate" scheme="yellow">
        Donate
      </Button>
      <div className="spacer"></div>
      <p>
        Thanks for using this website! Found a problem? Just want to say hi?
      </p>
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
      `}</style>
    </InfoPopup>
  );
};
