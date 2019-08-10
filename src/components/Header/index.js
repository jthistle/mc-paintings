import React, { useState } from 'react';
import { Link } from '@reach/router';

import Button from '../../components/Button';
import { c_HEADER, c_PRIMARY } from '../../theme';
import SupportView from '../SupportView';

export default () => {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      {showSupport && <SupportView onClose={() => setShowSupport(false)} />}
      <div className="header">
        <Link to="/">
          <h1 className="text">Minecraft 1.14 painting creator</h1>
        </Link>
        <div className="links">
          <Button internal="/backers">Backers</Button>
          <Button onClick={() => setShowSupport(true)} scheme="yellow">
            Support
          </Button>
          <Link to="/privacy">
            <span className="privacyLink">Privacy</span>
          </Link>
        </div>
        <style jsx>{`
          .header {
            background-color: ${c_HEADER};
            width: 100%;
            padding: 0.3rem 2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
          }

          .links {
            display: flex;
            align-items: center;
          }

          .text {
            font-size: 1.5rem;
            color: ${c_PRIMARY};
          }

          .privacyLink {
            display: inline-block;
            margin-left: 1rem;
            color ${c_PRIMARY};
            font-size: 0.8rem;
          }

          :global(.header a) {
            text-decoration: none;
          }
        `}</style>
      </div>
    </>
  );
};
