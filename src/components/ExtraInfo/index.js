import React from 'react';
import campaignLink from './link';
import { c_SUBTLE } from '../../theme';
import campaignImage from './image.png';

function ExtraInfo(props) {
  return (
    <div>
      <div className="supported">Supported by:</div>
      <a href={campaignLink} target="_blank" rel="noopener noreferrer">
        <div className="information"></div>
      </a>
      <div className="ethical">All adverts are ethically sourced</div>
      <style jsx>{`
        .information {
          height: 100px;
          width: 320px;
          border: 1px solid ${c_SUBTLE};
          display: inline-block;
          margin-top: 1rem;
          background-image: url(${campaignImage});
        }

        .ethical {
          color: ${c_SUBTLE};
          font-size: 0.8rem;
        }

        .supported {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}

export default ExtraInfo;
