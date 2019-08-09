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
