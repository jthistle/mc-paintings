import React from 'react';

import { c_BLANK } from '../../theme';

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
