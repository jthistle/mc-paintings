import React from 'react';
import Button from '../Button';
import { Link } from '@reach/router';
import { c_DARKEST, c_PRIMARY } from '../../theme';

export default ({ onAccept }) => {
  return (
    <div className="bar">
      <div className="text">
        This website uses cookies.{' '}
        <Link to="privacy/">
          <span className="more">More details</span>
        </Link>
        .
      </div>
      <Button onClick={onAccept}>I'm ok with that</Button>
      <style jsx>{`
        .bar {
          box-sizing: border-box;
          position: fixed;
          bottom: 0;
          width: 100vw;
          max-width: 100vw;
          display: flex;
          justify-content: center;
          background: ${c_DARKEST};
          padding: 1rem 0;
          align-items: center;
          z-index: 150;
          flex-wrap: wrap;
          max-height: 30vh;
        }

        .more {
          color: ${c_PRIMARY};
        }

        :global(.text > a) {
          text-decoration-color: ${c_PRIMARY};
        }

        .text {
          text-align: center;
          display: inline-block;
          margin: 1rem 2rem;
        }
      `}</style>
    </div>
  );
};
