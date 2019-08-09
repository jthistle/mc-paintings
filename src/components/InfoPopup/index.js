import React, { useEffect } from 'react';
import { c_INACTIVE } from '../../theme';

const InfoPopup = ({ children, bgColour, onReject }) => {
  const handleKeyPress = event => {
    if (event.key === 'Escape') {
      // escape
      onReject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress, false);
    return () => {
      window.removeEventListener('keydown', handleKeyPress, false);
    };
  });

  return (
    <div onKeyDown={handleKeyPress}>
      <div className="blackout" onClick={onReject} />
      <div className="box">{children}</div>
      <style jsx>{`
        .box {
          box-sizing: border-box;
          position: absolute;
          left: 20vw;
          top: 20vh;
          width: 60vw;
          padding: 2rem;
          text-align: center;
          background: ${bgColour || c_INACTIVE};
          border-radius: 0.5rem;
          z-index: 100;
        }

        @media (max-width: 600px) {
          .box {
            left: 5vw;
            top: 10vh;
            width: 90vw;
          }
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
    </div>
  );
};

export default InfoPopup;
