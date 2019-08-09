import React from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';

import { c_ACTION, c_HIGHLIGHT, c_PRIMARY, c_ACTIVE } from '../../theme';

export default ({ handleInput, onDownload, onClose }) => (
  <InfoPopup>
    <div className="wrapper">
      <h1>Download your resource pack</h1>
      <table>
        <tr>
          <td>
            <label for="packName">Pack name:</label>
          </td>
          <td>
            <input
              className="textInput"
              type="text"
              id="packName"
              placeholder="Pack name"
              onChange={e => handleInput(e, 'name')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="packDesc">Pack description:</label>
          </td>
          <td>
            <input
              className="textInput"
              type="text"
              id="packDesc"
              placeholder="Pack description"
              onChange={e => handleInput(e, 'description')}
            />
          </td>
        </tr>
      </table>
      <br />
      <Button onClick={onClose}>Go back</Button>
      <Button onClick={onDownload}>Download resource pack (MC 1.14)</Button>
    </div>
    <style jsx>{`
      .wrapper {
        text-align: center;
      }

      table {
        display: inline-block;
        margin-bottom: 3rem;
      }

      table tr {
        text-align: left;
      }

      label {
        padding: 0 1rem;
      }

      .textInput {
        height: 3rem;
        background: ${c_ACTION};
        border-radius: 0.25rem;
        border: none;
        padding: 0 0.5rem;
        color: ${c_PRIMARY};
        transition: all 0.2s;
        font-weight: bold;
      }

      .textInput:hover {
        background: ${c_HIGHLIGHT};
      }

      .textInput:focus {
        background: ${c_ACTIVE};
        color: white;
      }
    `}</style>
  </InfoPopup>
);
