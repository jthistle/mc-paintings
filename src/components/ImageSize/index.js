import React, { useState } from 'react';
import {
  c_INACTIVE,
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_PRIMARY,
} from '../../theme';

const BASE_SIZE = 3; // rem

function dimensionsFromSize(size) {
  return size.split('x').map(val => parseInt(val));
}

const ImageSelect = ({ image, size, index, onSelect }) => {
  const [width, height] = dimensionsFromSize(size);

  const onClick = () => {
    onSelect(size, index);
  };

  return (
    <div className="imageSelect" onClick={onClick}>
      {image && <img src={image} />}
      <style jsx>{`
        .imageSelect,
        img {
          width: ${BASE_SIZE * width}rem;
          height: ${BASE_SIZE * height}rem;
          background: ${image ? 'none' : c_INACTIVE};
        }

        .imageSelect {
          flex-grow: 0;
          margin: 0.25rem 0.1rem;
        }
      `}</style>
    </div>
  );
};

const ImageSize = ({ size, images, isExpanded, onClick, onImageSelect }) => {
  const [width, height] = dimensionsFromSize(size);

  const handleClick = () => onClick(size);

  const handleClose = () => onClick(null);

  return (
    <div className="imageSize" onClick={handleClick}>
      {size}
      <div className="expandedMenu" onClick={handleClose}>
        {images.map((image, index) => (
          <ImageSelect
            size={size}
            index={index}
            image={image}
            onSelect={onImageSelect}
          />
        ))}
      </div>
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
          width: ${BASE_SIZE * 5}rem;
          border: 1px solid ${c_PRIMARY};
          background: ${c_ACTIVE};
          position: absolute;
          z-index: ${isExpanded ? 10 : -10};
          border-radius: 0.25rem;
          top: 0;
          left: 0;
          transition: all 0.2s;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ImageSize;
