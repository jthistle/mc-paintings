import React from 'react';
import InfoPopup from '../InfoPopup';
import {
  c_WARNING_ACTION,
  c_WARNING_ACTIVE,
  c_WARNING_HIGHLIGHT,
  c_WARNING_INACTIVE,
} from '../../theme';

const Button = ({ children, onClick }) => (
  <div className="button" onClick={onClick}>
    {children}
    <style jsx>{`
      .button {
        display: inline-block;
        border-radius: 0.25rem;
        text-align: center;
        padding: 0.5rem 1rem;
        background: ${c_WARNING_ACTION};
        transition: all 0.2s;
        font-weight: bold;
        cursor: pointer;
      }

      .button:hover {
        background: ${c_WARNING_HIGHLIGHT};
      }

      .button:active {
        background: ${c_WARNING_ACTIVE};
      }
    `}</style>
  </div>
);

const Warning = ({ children, onAccept, onReject }) => {
  return (
    <InfoPopup bgColour={c_WARNING_INACTIVE} onReject={onReject}>
      {children}
      <div className="buttonContainer">
        <Button onClick={onReject}>Go back</Button>
        <Button onClick={onAccept}>Continue anyway</Button>
      </div>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          justify-content: space-evenly;
          margin-top: 3rem;
        }
      `}</style>
    </InfoPopup>
  );
};

export default Warning;
