/*
 *  Copyright (C) 2021 James Thistlewood
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
import Button from '../../components/Button';
import Layout, { Column } from '../../components/Layout';
import { GITHUB, FEEDBACK } from '../../supportLinks.json';

function Partnership(props) {
  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Affiliate links disclaimer</h1>
          <p>
            There are some links on this website which are affiliate links. This
            means that if you follow them and end up making a purchase, I will
            receive a proportion of the money spent as commission. A link to a
            product is not an endorsement of that product.
          </p>
          <Button internal="/">Back</Button>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 4rem;
        }

        p {
          text-align: left;
          margin-bottom: 2rem;
        }

        h1 {
          margin-top: 4rem;
        }

        h1:nth-child(1) {
          margin-top: 2rem;
        }

        a {
          color: white;
        }
      `}</style>
    </Layout>
  );
}

export default Partnership;
