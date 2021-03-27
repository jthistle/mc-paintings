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

import { c_BLANK } from '../../misc/theme';

function dimensionsFromSize(size) {
  return size.split('x').map((val) => parseInt(val));
}

const BASE_SIZE = 3; // rem

const ImageSelectMobile = ({ size, image, index }) => {
  const [width, height] = dimensionsFromSize(size);

  return (
    <div className="container">
      <div className="imageSelect">
        {image && <img src={image} alt={`Size ${size} number ${index + 1}`} />}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: space-around;
        }

        .imageSelect,
        img {
          width: ${BASE_SIZE * width}rem;
          height: ${BASE_SIZE * height}rem;
        }

        .imageSelect {
          flex-grow: 0;
          margin: auto 0;
          background: ${image ? 'none' : c_BLANK};
          transition: all 0.2s;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default ImageSelectMobile;
