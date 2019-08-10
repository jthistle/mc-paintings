import React from 'react';
import Layout, { Column } from '../../components/Layout';
import { c_PRIMARY } from '../../theme';

const DonationThank = () => {
  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Thank you for your donation</h1>
          <p className="highlight">
            Thank you so much for your donation. It means a lot, and helps to
            keep this website running.
          </p>
          <p>
            Unless you asked otherwise, your name will be added to the list of
            backers as soon as possible (at least within the next week).
            <br />
            If this hasn't happened,{' '}
            <a href="mailto:jamesthistlewood@gmail.com">let me know</a>. Your
            thank-you email will also be arriving soon.
          </p>
          <p>Once again, thank you so much for your support.</p>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
        }

        .highlight {
          font-weight: bold;
        }

        a {
          color: ${c_PRIMARY};
        }
      `}</style>
    </Layout>
  );
};

export default DonationThank;
