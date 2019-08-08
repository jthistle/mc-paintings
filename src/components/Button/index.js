import React from 'react';
import {
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_INACTIVE,
  c_INACTIVE_TEXT,
} from '../../theme';

const Button = ({ children, onClick, disabled }) => (
  <div className="button" onClick={onClick} disabled={disabled}>
    {children}
    <style jsx>{`
      .button {
        display: inline-block;
        padding: 0 1rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 0.25rem;
        background: ${c_ACTION};
        transition: all 0.3s;
        text-align: center;
        font-weight: bold;
      }

      .button:hover {
        background: ${c_HIGHLIGHT};
      }

      .button:active {
        background: ${c_ACTIVE};
      }

      .button[disabled] {
        background: ${c_INACTIVE};
        color: ${c_INACTIVE_TEXT};
      }
    `}</style>
  </div>
);

export default Button;
