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
import { c_ACTION, c_HIGHLIGHT, c_PRIMARY, c_ACTIVE } from '../../theme';

const TextInput = ({ onChange, ...props }) => {
  return (
    <>
      <input className="textInput" type="text" onChange={onChange} {...props} />
      <style jsx>{`
        .textInput {
          height: 2.5rem;
          background-color: ${c_ACTION};
          border-radius: 0.25rem;
          border: none;
          padding: 0 0.5rem;
          color: ${c_PRIMARY};
          transition: all 0.2s;
          width: 100%;
        }

        .textInput::placeholder {
          color: #74a5c2;
        }

        .textInput:focus::placeholder {
          color: #18618b;
        }

        .textInput {
          font-weight: bold;
        }

        .textInput:hover {
          background-color: ${c_HIGHLIGHT};
        }

        .textInput:focus {
          background-color: ${c_ACTIVE};
          color: white;
        }
      `}</style>
    </>
  );
};

export default TextInput;
