import React, { useEffect, useState } from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import TextInput from '../TextInput';
import { c_BLANK, c_BLANK_ACTIVE } from '../../theme';

import links from '../../supportLinks.json';

const PAYPAL = links.PAYPAL;
const TWITTER = links.TWITTER;
const GITHUB = links.GITHUB;
const FEEDBACK = links.FEEDBACK;

const Line = () => (
  <div className="line">
    <style jsx>{`
      .line {
        display: inline-block;
        border-top: 1px solid ${c_BLANK_ACTIVE};
        border-bottom: 1px solid ${c_BLANK};
        width: 90%;
      }
    `}</style>
  </div>
);

export default ({ onClose }) => {
  return (
    <InfoPopup onReject={onClose}>
      <h1>Thank you for using this website</h1>
      <p>
        Things like this take time to make and cost money to keep running, and I
        hate ads.
      </p>
      <p className="highlight">Please consider supporting me:</p>
      <Button external={PAYPAL} scheme="yellow">
        Donate
      </Button>
      <p>
        I'm incredibly grateful for any donations.
        <br />
        When you donate, I will add your name to the list of backers (leave a
        message if you don't want your name added).
        <br />
        I'll also email everyone who donates to thank you personally :)
      </p>
      <Line />
      <p>Other ways to support me, without having to spend money:</p>
      <Button external={TWITTER}>Tweet about it</Button>
      <Button external={GITHUB} scheme="black">
        Star on GitHub
      </Button>
      <div className="break" />
      <p>Or, just</p>
      <Button external={FEEDBACK}>Give some feedback</Button>
      <style jsx>{`
        .highlight {
          font-weight: bold;
        }

        .break {
          margin-top: 2rem;
        }
      `}</style>
    </InfoPopup>
  );
};
