import React, { useRef } from 'react';
import {
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_PRIMARY,
  c_BLANK,
  c_BLANK_HIGHLIGHT,
  c_BLANK_ACTIVE,
} from '../../theme';

const BASE_SIZE = 3; // rem

function dimensionsFromSize(size) {
  return size.split('x').map(val => parseInt(val));
}

const ImageSelect = ({ image, size, index, onSelect, isSelected }) => {
  const [width, height] = dimensionsFromSize(size);

  const onClick = event => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(size, index);
  };

  return (
    <div
      className={`imageSelect ${isSelected ? ' selected' : ''}`}
      onClick={onClick}
    >
      {image && <img src={image} />}
      <style jsx>{`
        .imageSelect,
        img {
          width: ${BASE_SIZE * width}rem;
          height: ${BASE_SIZE * height}rem;
        }

        .imageSelect {
          flex-grow: 0;
          margin: 0.25rem;
          background: ${image ? 'none' : c_BLANK};
          transition: all 0.2s;
        }

        .imageSelect:hover {
          background: ${image ? 'none' : c_BLANK_HIGHLIGHT};
        }

        .imageSelect.selected {
          outline: 3px solid ${c_BLANK_ACTIVE};
        }
      `}</style>
    </div>
  );
};

const ImageSize = ({
  size,
  images,
  isExpanded,
  onClick,
  onImageSelect,
  hasSelected,
}) => {
  const [width, height] = dimensionsFromSize(size);

  const handleClick = () => onClick(size);

  const handleClose = () => onClick(null);

  return (
    <div className="imageSize" onClick={handleClick}>
      {size}
      <div className="expandedMenu" onClick={handleClose}>
        <div className="closeBtn">X</div>
        <div className="sizes">
          {images.map((image, index) => (
            <ImageSelect
              size={size}
              index={index}
              image={image}
              onSelect={onImageSelect}
              isSelected={hasSelected === index}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .imageSize {
          position: relative;
          display: inline-block;
          background: ${c_ACTION};
          width: ${BASE_SIZE * width}rem;
          height: ${BASE_SIZE * height}rem;
          text-align: center;
          line-height: ${BASE_SIZE * height}rem;
          font-weight: ${typeof hasSelected === 'number' ? 'bold' : 'normal'};
          transition: background 0.2s;
        }

        .imageSize:hover {
          background: ${c_HIGHLIGHT};
        }

        .expandedMenu {
          display: ${isExpanded ? 'block' : 'none'};
          width: ${BASE_SIZE * 5}rem;
          border: 1px solid ${c_PRIMARY};
          background: ${c_ACTIVE};
          position: absolute;
          z-index: 10;
          border-radius: 0.25rem;
          top: 0;
          left: 0;
          padding: 0.5rem;
        }

        .sizes {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }

        .closeBtn {
          width: 100%;
          height: 1.5rem;
          line-height: 1.5rem;
          font-weight: bold;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default ImageSize;
