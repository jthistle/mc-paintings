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

import InfoPopup from '../InfoPopup';
import Button from '../Button';

import { PAYPAL, TWITTER, GITHUB, FEEDBACK } from '../../misc/supportLinks';

const FinishView = ({ onClose }) => {
  return (
    <InfoPopup onReject={onClose}>
      <Button external={PAYPAL} scheme="yellow" big>
        Donate
      </Button>
      <p className="text">
        Thanks for using this website! <br />
        Things like this take time to make and cost money to keep running.
        <br />
        <b>You are one of 1000 monthly users. &nbsp;999 don't donate.</b>
      </p>
      <Button external={TWITTER}>Tweet about it</Button>
      <Button external={GITHUB} scheme="black">
        Star on GitHub
      </Button>
      <div className="break" />
      <p>
        When you donate, I will add your name to the list of backers - if you
        don't want your name added leave a message.
      </p>
      <p>Or, just</p>
      <Button external={FEEDBACK}>Give some feedback</Button>
      <style jsx>{`
        .highlight {
          font-weight: bold;
        }

        .break {
          margin-top: 2rem;
        }

        .text {
          line-height: 1.5rem;
        }
      `}</style>
    </InfoPopup>
  );
};

export default FinishView;
