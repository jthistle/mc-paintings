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

import React, { useState } from 'react';
import { Link } from '@reach/router';

import Button from '../../components/Button';
import { c_HEADER, c_PRIMARY } from '../../theme';
import SupportView from '../SupportView';

export default () => {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      {showSupport && <SupportView onClose={() => setShowSupport(false)} />}
      <div className="header">
        <Link to="/">
          <h1 className="text">Minecraft 1.15 painting creator</h1>
        </Link>
        <div className="links">
          <Button internal="/backers">Backers</Button>
          <Button
            onClick={() => setShowSupport(true)}
            scheme="yellow"
            className="linkBtn"
          >
            Support
          </Button>
          <Link to="/privacy">
            <span className="privacyLink">Privacy</span>
          </Link>
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

          .privacyLink {
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
