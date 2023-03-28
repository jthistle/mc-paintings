/*
 *  Copyright (C) 2022 James Thistlewood
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
import { PAYPAL } from '../../supportLinks.json';

const Donate = ({ ...props }) => {
  return (
    <Layout>
      <Column>
        <div className="content">
          <div className="spacer"></div>
          <b>Thank you for choosing to donate.</b>
          <p>
            Please note that when you donate, I will add your name to the list
            of backers - please leave a message if you don't want your name
            added.
          </p>
          <p>
            To continue to PayPal, simply press the button below. Thanks again!
          </p>
          <div className="spacer"></div>
          <a href={PAYPAL}>
            <img
              src="/btn_donate_LG.png"
              alt="Donate with PayPal button"
              title="PayPal - The safer, easier way to pay online!"
            />
          </a>
        </div>
      </Column>
      <style jsx>{`
        .spacer {
          height: 2rem;
        }

        .content {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Donate;
