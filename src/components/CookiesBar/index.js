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

import React from 'react';
import Button from '../Button';
import { Link } from '@reach/router';
import { c_DARKEST, c_PRIMARY } from '../../theme';

export default ({ onAccept }) => {
  return (
    <div className="bar">
      <div className="text">
        This website uses cookies.{' '}
        <Link to="privacy/">
          <span className="more">More details</span>
        </Link>
        .
      </div>
      <Button onClick={onAccept}>I'm ok with that</Button>
      <style jsx>{`
        .bar {
          box-sizing: border-box;
          position: fixed;
          bottom: 0;
          width: 100vw;
          max-width: 100vw;
          display: flex;
          justify-content: center;
          background: ${c_DARKEST};
          padding: 1rem 0;
          align-items: center;
          z-index: 150;
          flex-wrap: wrap;
          max-height: 30vh;
        }

        .more {
          color: ${c_PRIMARY};
        }

        :global(.text > a) {
          text-decoration-color: ${c_PRIMARY};
        }

        .text {
          text-align: center;
          display: inline-block;
          margin: 1rem 2rem;
        }
      `}</style>
    </div>
  );
};
