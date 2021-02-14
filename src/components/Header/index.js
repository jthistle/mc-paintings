/*
 *  Copyright (C) 2019 James Thistlewood
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
import { Link } from '@reach/router';
import CapturedLink from '../CapturedLink';

import Button from '../../components/Button';
import { c_HEADER, c_PRIMARY } from '../../theme';

import mediaQuery from '../../components/media';
import { useMedia } from 'react-media';

export default ({ capture }) => {
  const media = useMedia(mediaQuery); // TODO: dropdown / fullscreen menu
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1 className="text">Minecraft Painting Creator</h1>
        </Link>
        <div className="links">
          <Button internal="/backers" capture={capture}>
            Backers
          </Button>
          <Button
            internal="/support"
            scheme="yellow"
            className="linkBtn"
            capture={capture}
          >
            Support
          </Button>
          <CapturedLink to="/privacy" capture={capture}>
            <span className="privacyLink">Privacy</span>
          </CapturedLink>
          <CapturedLink to="/enquiries" capture={capture}>
            <span className="enquiriesLink">Enquiries</span>
          </CapturedLink>
        </div>
        <style jsx>{`
          .header {
            background-color: ${c_HEADER};
            width: 100%;
            padding: 0.3rem 2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
          }

          .links {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
          }

          .text {
            font-size: 1.5rem;
            color: ${c_PRIMARY};
          }

          .privacyLink, .enquiriesLink {
            display: inline-block;
            margin: 0.25rem 1rem;
            color ${c_PRIMARY};
            font-size: 0.8rem;
          }

          :global(.header a) {
            text-decoration: none;
          }
        `}</style>
      </div>
    </>
  );
};
