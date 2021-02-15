/*
 *  Copyright (C) 2020 James Thistlewood
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
import Button from '../../components/Button';
import ExtraInfo from '../../components/ExtraInfo';
import { PAYPAL, TWITTER, GITHUB, FEEDBACK } from '../../supportLinks.json';

const Support = ({ ...props }) => {
  return (
    <Layout>
      <Column>
        <div className="content">
          <div className="spacer"></div>
          <b>
            Help keep this website alive for as little as the price of a coffee!
          </b>
          <div className="spacer"></div>
          <Button external={PAYPAL} scheme="yellow" big>
            Donate
          </Button>
          <p>
            I'm incredibly grateful for any donations.
            <br />
            When you donate, I will add your name to the list of backers - leave
            a message if you don't want your name added.
          </p>
          <p>Other ways to support me:</p>
          <Button external={TWITTER}>Tweet about it</Button>
          <Button external={GITHUB} scheme="black">
            Star on GitHub
          </Button>
          <p>Or, just</p>
          <Button external={FEEDBACK}>Give some feedback</Button>
        </div>
      </Column>
      <style jsx>{`
        .highlight {
          font-weight: bold;
        }

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

export default Support;
