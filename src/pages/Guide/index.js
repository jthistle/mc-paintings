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
            <li>Copy or move the zip file to this folder</li>
            <li>You may need to restart Minecraft at this point</li>
            <li>Navigate to 'Options' &gt; 'Resource Packs'</li>
            <li>Activate the resource pack</li>
          </ol>
          <h2 id="android">How to install a resource pack (Android)</h2>
          <ol>
            <li>
              Download your resource pack - it will be a .zip or .mcpack file
            </li>
            <li>Open your file explorer</li>
            <li>If your file is a .zip file, rename it to be a .mcpack file</li>
            <li>
              Tap on the file, and open it with Minecraft
              <ul>
                <li>
                  If this doesn't work, you may need to install a third-party
                  file explorer from the Play Store.
                </li>
              </ul>
            </li>
            <li>Minecraft should now be open</li>
            <li>Press 'Options'</li>
            <li>Select 'Global Resources' on the left</li>
            <li>Expand 'My Packs'</li>
            <li>
              Select the new resource pack
              <ul>
                <li>
                  If it doesn't show up, you might need to restart Minecraft.
                </li>
              </ul>
            </li>
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
