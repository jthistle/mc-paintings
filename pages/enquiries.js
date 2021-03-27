import React, { useState, useRef } from 'react';
import Layout, { Column } from '../src/components/Layout';
import Button from '../src/components/Button';
import { c_INACTIVE } from '../src/misc/theme';
import ReactGA from '../src/misc/analytics';

function Enquiries(props) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);

  const email = process.env.REACT_APP_ENQUIRY_EMAIL;

  const copyToClipboard = () => {
    emailRef.current.select();
    document.execCommand('copy');
    emailRef.current.focus();
    setCopied(true);
    ReactGA.event({
      category: 'Enquiries',
      action: 'Copy to Clipboard',
    });
  };

  const reveal = () => {
    setRevealed(true);
    emailRef.current.value = email;
    ReactGA.event({
      category: 'Enquiries',
      action: 'Reveal Email',
    });
  };

  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Make an enquiry</h1>
          <div className="emailRow">
            <textarea
              readOnly
              asdas="ads"
              className="email"
              ref={emailRef}
            ></textarea>
            {revealed ? (
              <Button onClick={copyToClipboard}>Copy to clipboard</Button>
            ) : (
              <Button onClick={reveal}>Reveal email</Button>
            )}
          </div>
          <div className="copied">{copied ? 'Copied!' : ''}</div>
          <p className="info">
            Minecraft Painting Creator offers competitive rates for advertising.
            The website is rapidly growing, with the number of visiting users
            increasing every week. Your message will reach hundreds of people
            from across the world, with key areas being the US and Brazil.
          </p>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
        }

        .info {
          display: inline-block;
          max-width: 60vw;
          font-size: 1.1rem;
          line-height: 1.4rem;
        }

        @media (max-width: 600px) {
          .info {
            max-width: 90vw;
          }
        }

        .email {
          display: inline-block;
          border-radius: 0.5rem;
          background: ${c_INACTIVE};
          min-width: 20rem;
          height: 3rem;
          line-height: 3rem;
          padding: 0 1rem;
          border: none;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          resize: none;
          wrap: none;
        }

        .emailRow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .copied {
          margin: 1rem 0;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
}

export default Enquiries;
