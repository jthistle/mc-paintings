import React, { useState } from 'react';
import { c_ACTION, c_HIGHLIGHT, c_ACTIVE, c_PRIMARY } from '../../theme';

const BASE_SIZE = 3; // rem

const ImageSize = ({ size, images, isExpanded, onClick }) => {
  const [width, height] = size.split('x').map(val => parseInt(val));

  const handleClick = () => onClick(size);

  const handleClose = () => onClick(null);

  return (
    <div className="imageSize" onClick={handleClick}>
      {size}
      <div className="expandedMenu" onClick={handleClose}></div>

      <style jsx>{`
        .imageSize {
          position: relative;
          display: inline-block;
          background: ${c_ACTION};
          width: ${BASE_SIZE * width}rem;
          height: ${BASE_SIZE * height}rem;
          transition: all 0.2s;
          text-align: center;
          line-height: ${BASE_SIZE * height}rem;
        }

        .imageSize:hover {
          background: ${c_HIGHLIGHT};
        }

        .expandedMenu {
          opacity: ${isExpanded ? 1 : 0};
          width: ${isExpanded ? 15 : 0}rem; /* DEBUG*/
          height: ${isExpanded ? 10 : 0}rem; /* DEBUG*/
          border: 1px solid ${c_PRIMARY};
          background: ${c_ACTIVE};
          position: absolute;
          z-index: 10;
          border-radius: 0.25rem;
          top: 0;
          left: 0;
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ImageSize;
