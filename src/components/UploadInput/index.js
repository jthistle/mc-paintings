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
import {
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_INACTIVE,
  c_INACTIVE_TEXT,
} from '../../theme';

const INPUT_HEIGHT = 3; // rem
const INPUT_WIDTH = 15; // rem

export default ({ onUpload, children, disabled, width }) => {
  width = width || INPUT_WIDTH;
  return (
    <div className={`fakeButton ${disabled && 'disabled'}`}>
      <div className="textBox">{children}</div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUpload}
        className="fileInput"
        disabled={!!disabled}
        aria-label="Upload an image"
      />
      <style jsx>{`
        .fakeButton {
          position: relative;
          display: inline-block;
          border-radius: 0.25rem;
          background: ${c_ACTION};
          transition: all 0.3s;
          text-align: center;
          margin: 0.25rem;
        }

        .fakeButton:hover {
          background: ${c_HIGHLIGHT};
        }

        .fakeButton:active {
          background: ${c_ACTIVE};
        }

        .fakeButton.disabled {
          background: ${c_INACTIVE};
          color: ${c_INACTIVE_TEXT};
        }

        .textBox {
          height: ${INPUT_HEIGHT}rem;
          width: ${width}rem;
          z-index: 1;
          line-height: ${INPUT_HEIGHT}rem;
          font-weight: bold;
        }

        .fileInput {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0;
          height: ${INPUT_HEIGHT}rem;
          width: ${width}rem;
        }

        input:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
