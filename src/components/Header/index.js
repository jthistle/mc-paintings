import React from 'react';
import { c_HEADER } from '../../theme';

export default () => {
  return (
    <div className="header">
      <h1 className="text">Minecraft 1.14 painting creator</h1>
      <style jsx>{`
        .header {
          background-color: ${c_HEADER};
          width: 100%;
          padding: 0.3rem 2rem;
          box-sizing: border-box;
        }

        .text {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};
