import React from 'react';
import campaignLink from './link';
import { c_SUBTLE } from '../../theme';
import campaignImage from './image.png';

function ExtraInfo(props) {
  return (
    <div>
      <div className="supported">Supported by:</div>
      <a href={campaignLink} target="_blank" rel="noopener noreferrer">
        <div className="information">
          <img src={campaignImage} alt="campaign" />
        </div>
      </a>
      <div className="ethical">All adverts are ethically sourced</div>
      <style jsx>{`
        .information {
          width: 100%;
          max-width: 320px;
          display: inline-block;
          margin-top: 1rem;
          border: none;
        }

        img {
          width: 100%;
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
