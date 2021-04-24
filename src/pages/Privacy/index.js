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

import React, { useState, useEffect } from 'react';
import Layout, { Column } from '../../components/Layout';
import Button from '../../components/Button';

const Privacy = () => {
  const [isOptedOut, setIsOptedOut] = useState(
    localStorage.getItem('canTrack') === 'no'
  );

  const setOptout = () => {
    localStorage.setItem('canTrack', 'no');
    // erase analytics cookies
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let key = cookies[i].split('=');
      document.cookie = key[0] + ' =; expires = Thu, 01 Jan 1970 00:00:00 UTC';
    }
    setIsOptedOut(true);
  };

  useEffect(() => {
    setIsOptedOut(localStorage.getItem('canTrack') === 'no');
  }, []);

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
              analytics cookies, which allow me to see how many people visit my
              site. These analytics cookies collect your <b>anonymized</b> IP
              address, what kind of device you're using, your general location
              (i.e. which city), the date and time certain pages were accessed,
              and how you use some functions of the website. This data is, as
              described above, all anonymized through IP anonymization. I use
              this information to improve the website.
            </li>
          </ul>
          <p>Please also note:</p>
          <ul>
            <li>
              Your uploaded images and the texture pack are all managed and
              created client-side, which means none of your images are ever sent
              off to a server - only you, and people you share your texture pack
              with, can see the images that you use.
            </li>
          </ul>
          <p>If you really want, you can:</p>
          <Button onClick={setOptout} disabled={isOptedOut}>
            Opt out of analytics
          </Button>
          {isOptedOut && <p>You are opted out of analytics cookies.</p>}
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
      `}</style>
    </Layout>
  );
};

export default Privacy;
