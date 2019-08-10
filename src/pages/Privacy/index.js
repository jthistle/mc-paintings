import React, { useState } from 'react';
import Layout, { Column } from '../../components/Layout';
import Button from '../../components/Button';

const Privacy = () => {
  const [isOptedOut, setIsOptedout] = useState(false); // TODO local storage

  const setOptout = () => {
    // TODO
    setIsOptedout(true);
  };

  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Privacy</h1>
          <p>Some cookies are used in this website. They are, exclusively: </p>
          <ul>
            <li>
              necessary cookies that are required to keep the site functioning
            </li>
            <li>
              analytics cookies, literally just because I want to see how many
              people visit my site.
              <br />
              These analytics cookies collect your <b>anonymized</b> IP address,
              what kind of device you're using,
              <br />
              your general location (i.e. which city) and the date and time
              certain pages were accessed. This
              <br />
              is data is, as just described, all effectively anonymized through
              IP anonymization.
            </li>
          </ul>
          <p>If you really want, you can:</p>
          <Button onClick={setOptout} disabled={isOptedOut}>
            Opt out of analytics
          </Button>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Privacy;
