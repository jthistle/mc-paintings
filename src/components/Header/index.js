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
import { Link } from '@reach/router';
import CapturedLink from '../CapturedLink';

import { c_DARKEST, c_HEADER, c_PRIMARY } from '../../theme';

import mediaQuery from '../../components/media';
import { useMedia } from 'react-media';
import ReactGA from '../../analytics';

import MenuIcon from './menu.svg';

const Links = ({ capture, mobile }) => {
  const kofiHandler = (e) => {
    ReactGA.donateClick('header', '');
  };

  return (
    <div className="links">
      <div
        className="kofi"
        dangerouslySetInnerHTML={{ __html: window.kofiwidget2.getHTML() }}
        onClick={kofiHandler}
      />
      <CapturedLink to="/guide" capture={capture}>
        <span className="textLink">Guide</span>
      </CapturedLink>
      <CapturedLink to="/privacy" capture={capture}>
        <span className="textLink">Privacy</span>
      </CapturedLink>
      <CapturedLink to="/about" capture={capture}>
        <span className="textLink">About</span>
      </CapturedLink>
      <style jsx>{`
      .textLink {
        display: inline-block;
        margin: 0.25rem 1rem;
        color ${c_PRIMARY};
        font-size: ${mobile ? '1rem' : '0.8rem'};
      }

      .links {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: ${mobile ? 'column' : 'row'};
      }

      .kofi {
        margin: ${mobile ? '1rem' : '0'} 2rem;
      }
    `}</style>
    </div>
  );
};

export default ({ capture }) => {
  const media = useMedia(mediaQuery);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(false);
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <h1 className="text">Minecraft Painting Creator</h1>
        </Link>
        {media.mobile ? (
          <div className="menuIcon" onClick={() => setShowDropdown(true)}>
            <img src={MenuIcon} alt="Menu" />
          </div>
        ) : (
          <Links capture={capture} />
        )}
        <div className="menu">
          <Links capture={capture} mobile />
        </div>
        {showDropdown && <div className="menuClose" onClick={closeMenu} />}
        <style jsx>{`
          .header {
            background-color: ${c_HEADER};
            width: 100%;
            padding: 0.3rem 2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .text {
            font-size: 1.5rem;
            color: ${c_PRIMARY};
          }

          .menuIcon {
            cursor: pointer;
          }

          .menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            padding: 2rem 0;
            z-index: 100;
            background: ${c_DARKEST};
            text-align: right;
            transition: all 0.2s;
            transform: translate(0, ${showDropdown ? '0' : '-100vh'});
          }

          .menuClose {
            position: fixed;
            z-index: 99;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background: black;
            opacity: 0.2;
          }

          :global(.header a) {
            text-decoration: none;
          }
        `}</style>
      </div>
    </>
  );
};
