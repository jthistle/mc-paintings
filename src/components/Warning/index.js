import React from 'react';
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
    <>
      <div className="blackout" />
      <div className="box">
        {children}
        <div className="buttonContainer">
          <Button onClick={onReject}>Go back</Button>
          <Button onClick={onAccept}>Continue anyway</Button>
        </div>
      </div>
      <style jsx>{`
        .box {
          position: absolute;
          left: 20vw;
          top: 20vh;
          width: 60vw;
          padding: 2rem;
          text-align: center;
          background: ${c_WARNING_INACTIVE};
          border-radius: 0.5rem;
          z-index: 100;
        }

        .buttonContainer {
          display: flex;
          justify-content: space-evenly;
          margin-top: 3rem;
        }

        .blackout {
          background: black;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          opacity: 0.5;
          z-index: 99;
        }
      `}</style>
    </>
  );
};

export default Warning;
