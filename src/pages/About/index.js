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

// most of the links on this page are trustworthy
/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import Layout, { Column } from '../../components/Layout';
import { GITHUB, GITHUB_ISSUE, FEEDBACK } from '../../supportLinks.json';

function About(props) {
  return (
    <Layout>
      <Column>
        <div className="content">
          <h1>So, what is this?</h1>
          <p>
            Minecraft Painting Creator (or just 'mcpaintings', since I never
            actually decided on a decent brand identity for this thing) is a
            website which makes it easier to make Minecraft resource packs with
            images as your choice replacing the normal painting textures.
          </p>
          <p>
            I made this back in the Summer of 2019, and occasionally pay it a
            visit to update it to new Minecraft versions, or to make small
            fixes.
          </p>
          <h1>This website is free - forever</h1>
          <p>
            This website is free software. It's free as in 'free beer', but also
            free as in 'freedom'. Anyone can{' '}
            <a href={GITHUB} rel="noopener noreferrer" target="_blank">
              download the source code
            </a>{' '}
            and run it themselves. You can see how it works, and even contribute
            code to it should you wish.
          </p>
          <h1>The website is broken. What should I do?</h1>
          <p>
            Use{' '}
            <a href={FEEDBACK} target="_blank">
              the feedback form
            </a>{' '}
            or
            <a href={GITHUB_ISSUE} target="_blank">
              open an issue on GitHub
            </a>{' '}
            to let me know. I'll try to get issues fixed as quickly as I can,
            but I can only do so if you provide clear instructions on how to
            reproduce the problem. Leave your email in the form if you want to
            be contacted back.
          </p>
          <h1>About me</h1>
          <p>
            I'm James. You can{' '}
            <a href="https://jamesthistlewood.co.uk/about" target="_blank">
              find out more about me and the things I work on at my website
            </a>
            .
          </p>
          <p>
            If you want to keep up to date with other projects of mine, be sure
            to{' '}
            <a href="https://github.com/jthistle" target="_blank">
              follow me on GitHub
            </a>
            .
          </p>
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

export default About;
