/*
 *  Copyright (C) 2021 James Thistlewood
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
import CapturedLink from '../CapturedLink';
import {
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_INACTIVE,
  c_INACTIVE_TEXT,
  c_PRIMARY,
} from '../../misc/theme';

const ButtonInternals = ({
  children,
  onClick,
  disabled,
  scheme,
  noMargin,
  big,
}) => {
  let primary = c_PRIMARY;
  let secondary = c_ACTION;
  let secondaryHover = c_HIGHLIGHT;
  let secondaryActive = c_ACTIVE;
  let primaryDisabled = c_INACTIVE_TEXT;
  let secondaryDisabled = c_INACTIVE;

  switch (scheme) {
    case 'yellow':
      primary = '#4C4200';
      secondary = '#FFDE00';
      secondaryHover = '#FFEB64';
      secondaryActive = '#FFEB64';
      primaryDisabled = primary;
      secondaryDisabled = '#C6AC00';
      break;
    case 'black':
      primary = '#EEE';
      secondary = '#111';
      secondaryHover = '#222';
      secondaryActive = '#333';
      primaryDisabled = '#AAA';
      secondaryDisabled = '#111';
      break;
    default:
      break;
  }

  return (
    <div className="button" onClick={onClick} disabled={disabled}>
      {children}
      <style jsx>{`
        .button {
          display: inline-block;
          padding: 0 ${big ? 2 : 1}rem;
          height: ${big ? 5 : 3}rem;
          line-height: ${big ? 5 : 3}rem;
          border-radius: 0.25rem;
          background: ${secondary};
          transition: all 0.3s;
          text-align: center;
          font-weight: bold;
          margin: ${noMargin ? '0' : '0.25rem'};
          text-decoration: none;
          color: ${primary};
          cursor: pointer;
          font-size: ${big ? 2 : 1}rem;
        }

        .button:hover {
          background: ${secondaryHover};
        }

        .button:active {
          background: ${secondaryActive};
        }

        .button[disabled] {
          background: ${secondaryDisabled};
          color: ${primaryDisabled};
          cursor: default;
        }
      `}</style>
    </div>
  );
};

const Button = ({ external, internal, children, capture, ...props }) => {
  if (external) {
    return (
      <a href={external} target="_blank" rel="noopener noreferrer">
        <ButtonInternals {...props}>{children}</ButtonInternals>
      </a>
    );
  } else if (internal) {
    return (
      <CapturedLink to={internal} capture={capture}>
        <ButtonInternals {...props}>{children}</ButtonInternals>
      </CapturedLink>
    );
  } else {
    return <ButtonInternals {...props}>{children}</ButtonInternals>;
  }
};

export default Button;
