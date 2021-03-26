/*
 *  Copyright (C) 2019 James Thistlewood
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

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
            <a href={'mailto:' + process.env.REACT_APP_PRIVATE_EMAIL}>
              let me know
            </a>
            .
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
