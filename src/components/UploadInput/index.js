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

export default ({ onUpload, text, disabled }) => {
  return (
    <div className={`fakeButton ${disabled && 'disabled'}`}>
      <div className="textBox">{text}</div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUpload}
        className="fileInput"
        disabled={!!disabled}
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

        .fakeButton.disabled {
          background: ${c_INACTIVE};
          color: ${c_INACTIVE_TEXT};
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
