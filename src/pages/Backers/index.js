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

import React, { useState, useEffect } from 'react';
import Layout, { Column } from '../../components/Layout';
import Button from '../../components/Button';
import axios from 'axios';
import { c_INACTIVE } from '../../theme';

const BACKERS_URL = 'https://d24ckqemmplms5.cloudfront.net/backers.json';

const Backers = ({ ...props }) => {
  const [backers, setBackers] = useState(['Fetching backers...']);
  const [superBackers, setSuperBackers] = useState([
    'Fetching super backers...',
  ]);
  const [status, setStatus] = useState('init');
  const [cancelToken] = useState(axios.CancelToken.source());

  const fetchBackers = async () => {
    if (status !== 'init') return;

    try {
      let response = await axios.get(BACKERS_URL, {
        cancelToken: cancelToken.token,
      });
      let bck = response.data.backers;
      let sup = response.data.superBackers;

      setBackers(
        bck.length === 0
          ? ['No one has backed Minecraft Painting Generator yet.']
          : bck
      );
      setSuperBackers(
        sup.length === 0
          ? ['No one has super backed Minecraft Painting Generator yet.']
          : sup
      );
      setStatus('done');
    } catch (error) {
      console.error('Error:', error.message);
      setBackers(['Error fetching backers']);
      setSuperBackers(['Error fetching backers']);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchBackers();
    // eslint-disable-next-line
  }, [props]);

  // Cancel request on unmount
  useEffect(() => {
    return () => {
      cancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>Super Backers</h1>
          <p>For generous donations of £10 (or €10/$10) or more - thank you!</p>
          <div className="superBackers">
            {superBackers &&
              superBackers.map((name, i) => <h3 key={i}>{name}</h3>)}
          </div>
          <h1>Backers</h1>
          <div className="backersList">
            {backers && backers.map((name, i) => <p key={i}>{name}</p>)}
          </div>
          <h2>Get your name here!</h2>
          <Button scheme="yellow" internal="/donate">
            Donate
          </Button>
        </div>
      </Column>
      <style jsx>{`
        .content {
          text-align: center;
        }

        .backersList,
        .superBackers {
          display: inline-block;
          background: ${c_INACTIVE};
          width: 50vw;
          max-height: 50vh;
          overflow: auto;
          border-radius: 0.5rem;
        }

        .backersList {
          font-weight: bold;
        }

        .superBackers {
          color: '#FFEB64';
        }
      `}</style>
    </Layout>
  );
};

export default Backers;
