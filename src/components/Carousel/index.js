import React, { useState } from 'react';

import chevronLeftImg from './chevron_left.svg';
import chevronRightImg from './chevron_right.svg';

import { c_HIGHLIGHT, c_INACTIVE } from '../../theme';

const Carousel = ({ height, onChange, children, ...props }) => {
  const [currentInd, setCurrentInd] = useState(0);

  const move = (dir) => {
    let n = children.length;
    let newInd = (((currentInd + dir) % n) + n) % n;
    onChange && onChange(newInd);
    setCurrentInd(newInd);
  };

  return (
    <>
      <div className="carousel">
        <div className="arrow leftArrow" onClick={() => move(-1)}></div>
        <div className="current">{children[currentInd]}</div>
        <div className="arrow rightArrow" onClick={() => move(1)}></div>
      </div>
      <div className="dots">
        {children.map((_, i) => {
          return (
            <div
              className={`dot ${i === currentInd ? 'currentDot' : ''}`}
              key={i}
            >
              <svg viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="1.5" />
              </svg>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .carousel {
          display: flex;
          justify-content: space-between;
          width: 95vw;
          height: ${height || 'auto'};
        }

        .current {
          text-align: center;
          flex-grow: 1;
          display: inline-block;
          height: 100%;
        }

        .leftArrow {
          background: url(${chevronLeftImg});
        }
        .rightArrow {
          background: url(${chevronRightImg});
        }

        .arrow {
          display: inline-block;
          height: 100%;
          width: 10vw;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          cursor: pointer;
        }

        .dots {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 2rem;
          height: 2rem;
        }

        .dot {
          width: 1.5rem;
          flex-grow: 0;
          fill: ${c_INACTIVE};
          transition: 0.1s all;
        }

        .currentDot {
          fill: ${c_HIGHLIGHT};
          width: 2rem;
        }
      `}</style>
    </>
  );
};

export default Carousel;
