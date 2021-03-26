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
import Layout, { Column } from '../../components/Layout';

const Guide = () => {
  return (
    <Layout>
      <Column>
        <div className="content">
          <b>Contents:</b>
          <br />
          <ol>
            <li>
              <a href="#java">How to install a resource pack (Java)</a>
            </li>
            <li>
              <a href="#android">How to install a resource pack (Android)</a>
            </li>
          </ol>
          <div className="spacer" />
          <h2 id="java">How to install a resource pack (Java)</h2>
          <ol>
            <li>Download your resource pack (it will be a .zip file)</li>
            <li>Launch Minecraft</li>
            <li>Press 'Options'</li>
            <li>Press 'Resource Packs'</li>
            <li>Press 'Open resource pack folder'</li>
            <li>
              Now, you will have the folder open in which you need to place your
              zip file. Copy or move the zip file to this folder.
            </li>
            <li>You now may need to restart Minecraft</li>
            <li>Now, navigate to 'Options' &gt; 'Resource Packs'</li>
            <li>You can now activate the resource pack</li>
          </ol>
          <h2 id="android">How to install a resource pack (Android)</h2>
          <ol>
            <li>
              Download your resource pack (it will be a .zip or .mcpack file)
            </li>
            <li>Open your file explorer</li>
            <li>
              Move the downloaded file to your Minecraft data folder
              <ul>
                <li>
                  This will usually be 'Internal Storage' &gt; 'games' &gt;
                  'com.mojang' &gt; 'resource_packs'
                </li>
              </ul>
            </li>
            <li>Launch Minecraft</li>
            <li>Press 'Options'</li>
            <li>Select 'Global Resources' on the left</li>
            <li>Expand 'My Packs'</li>
            <li>Select the new resource pack</li>
            <li>Press 'Activate'</li>
            <li>You have successfully installed the resource pack!</li>
          </ol>
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

        ol {
          text-align: left;
          display: inline-block;
          line-height: 1.5rem;
        }

        a {
          text-decoration: underline;
          color: inherit;
        }
      `}</style>
    </Layout>
  );
};

export default Guide;
