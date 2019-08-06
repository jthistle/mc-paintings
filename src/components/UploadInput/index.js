import React from 'react';
import { c_ACTION, c_HIGHLIGHT, c_ACTIVE } from '../../theme';

const INPUT_HEIGHT = 3; // rem
const INPUT_WIDTH = 15; // rem

export default ({ callback }) => {
  return (
    <div className="fakeButton">
      <div className="textBox">Upload an image</div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={callback}
        className="fileInput"
      />
      <style jsx>{`
        .fakeButton {
          position: relative;
          display: inline-block;
          border-radius: 0.25rem;
          background: ${c_ACTION};
          transition: all 0.3s;
          text-align: center;
        }

        .fakeButton:hover {
          background: ${c_HIGHLIGHT};
        }

        .fakeButton:active {
          background: ${c_ACTIVE};
        }

        .textBox {
          height: ${INPUT_HEIGHT}rem;
          width: ${INPUT_WIDTH}rem;
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
          width: ${INPUT_WIDTH}rem;
        }
      `}</style>
    </div>
  );
};
