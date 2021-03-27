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

import InfoPopup from '../InfoPopup';
import {
  c_WARNING_ACTION,
  c_WARNING_ACTIVE,
  c_WARNING_HIGHLIGHT,
  c_WARNING_INACTIVE,
} from '../../misc/theme';

const Button = ({ children, onClick }) => (
  <div className="button" onClick={onClick}>
    {children}
    <style jsx>{`
      .button {
        display: inline-block;
        border-radius: 0.25rem;
        text-align: center;
        padding: 0.5rem 1rem;
        background: ${c_WARNING_ACTION};
        transition: all 0.2s;
        font-weight: bold;
        cursor: pointer;
        margin: 0 1rem;
      }

      .button:hover {
        background: ${c_WARNING_HIGHLIGHT};
      }

      .button:active {
        background: ${c_WARNING_ACTIVE};
      }
    `}</style>
  </div>
);

const Warning = ({ children, onAccept, onReject }) => {
  return (
    <InfoPopup bgColour={c_WARNING_INACTIVE} onReject={onReject}>
      {children}
      <div className="buttonContainer">
        <Button onClick={onReject}>Go back</Button>
        <Button onClick={onAccept}>Continue anyway</Button>
      </div>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          justify-content: space-evenly;
          margin-top: 3rem;
        }
      `}</style>
    </InfoPopup>
  );
};

export default Warning;
