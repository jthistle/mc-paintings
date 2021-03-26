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
import Button from '../../components/Button';

const NotFound = () => {
  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Oops... that page couldn't be found</h1>
          <p>
            Looks like that address doesn't exist. Reasons for this could be
            that:
          </p>
          <ul>
            <li>You mistyped the page address</li>
            <li>The page has moved or no longer exists</li>
          </ul>
          <div className="buttonContainer">
            <Button internal="/">Take me back home!</Button>
          </div>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
        }

        ul {
          display: inline-block;
          max-width: 40rem;
          text-align: left;
        }

        li {
          padding-top: 0.5rem;
        }

        .buttonContainer {
          display: block;
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default NotFound;
