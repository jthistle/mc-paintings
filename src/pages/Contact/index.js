/*
 *  Copyright (C) 2023 James Thistlewood
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

// most of the links on this page are trustworthy
/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import Layout, { Column } from '../../components/Layout';
import { GITHUB_ISSUE, FEEDBACK, TWEET_AT } from '../../supportLinks.json';
import Button from '../../components/Button';

function About(props) {
  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Get in contact</h1>
          <p>
            Have you found a problem with the website? Would you like to make a
            suggestion? Do you just want to say hi? Please get in contact, using
            any of the three methods below:
          </p>
          <div className="buttons">
            <Button external={TWEET_AT} scheme="tblue">
              Talk to me on Twitter
            </Button>
            <br />
            <Button external={FEEDBACK}>Leave feedback</Button>
            <br />
            <Button external={GITHUB_ISSUE} scheme="black">
              Open an issue on GitHub
            </Button>
          </div>
          <br />
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          text-align: justify;
          padding-bottom: 4rem;
        }

        h1 {
          text-align: center;
          margin-top: 4rem;
        }

        h2 {
          text-align: center;
        }

        h1:nth-child(1) {
          margin-top: 2rem;
        }

        a {
          color: white;
        }

        .buttons {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}

export default About;
