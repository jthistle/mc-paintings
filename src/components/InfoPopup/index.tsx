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

import React, { useEffect } from 'react';
import { c_INACTIVE } from '../../misc/theme';

interface InfoPopupProps {
  children: React.ReactNode;
  bgColour?: string;
  onReject(): void;
}
const InfoPopup = ({ children, bgColour, onReject }: InfoPopupProps) => {
  const handleKeyPress = (event: KeyboardEvent | React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      // escape
      onReject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress, false);
    return () => {
      window.removeEventListener('keydown', handleKeyPress, false);
    };
  });

  return (
    <div onKeyDown={handleKeyPress}>
      <div className="blackout" onClick={onReject} />
      <div className="box">
        {children}
        <div className="spacerContainer">
          <div className="spacer" />
        </div>
      </div>
      <style jsx>{`
        .box {
          box-sizing: border-box;
          position: absolute;
          left: 20vw;
          top: 10vh;
          width: 60vw;
          padding: 2rem;
          text-align: center;
          background: ${bgColour || c_INACTIVE};
          border-radius: 0.5rem;
          z-index: 100;
          margin-bottom: 3rem;
        }

        .spacerContainer {
          position: relative;
        }

        .spacer {
          position: absolute;
          top: 0;
          left: 0;
          height: 6rem;
        }

        @media (max-width: 600px) {
          .box {
            left: 5vw;
            top: 10vh;
            width: 90vw;
          }
        }

        .blackout {
          background: black;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          opacity: 0.5;
          z-index: 99;
        }
      `}</style>
    </div>
  );
};

export default InfoPopup;
