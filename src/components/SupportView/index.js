import React, { useEffect, useState } from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import TextInput from '../TextInput';
import { c_BLANK, c_BLANK_ACTIVE } from '../../theme';

const PAYPAL =
  'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MM2MS68EB8FZC&source=url';
const TWITTER =
  'https://twitter.com/intent/tweet?hashtags=minecraftpaintings&text=I just used Minecraft painting creator to create an awesome custom resource pack full of paintings!&url=http%3A%2F%2Fjamesthistlewood.co.uk%2Fputlinkhere';
const GITHUB = 'https://github.com/jthistle/mc-paintings/';
const FEEDBACK =
  'https://docs.google.com/forms/d/e/1FAIpQLScfjgvzPzw1OCbJVJ_gUwDDR1AxWtOQUZzxa2PeRw8BU-EhuA/viewform?usp=sf_link';

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
      <p>Things like this take time to make and cost money to keep running.</p>
      <p className="highlight">Please consider supporting me:</p>
      <Button external={PAYPAL} scheme="yellow">
        Donate
      </Button>
      <p>
        I'm incredibly grateful for any monetary donations. For £5 (or €5/$5
        etc.) or more, I will add your name to the list of backers. I'll also
        email everyone who donates to thank you personally :)
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
