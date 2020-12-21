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
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from 'react-select';

import { c_ACTION, c_PRIMARY, c_ACTIVE, c_INACTIVE } from '../../theme';

const selectOptions = [
  { value: '1_16', label: 'Java 1.16.2+' },
  { value: '1_15', label: 'Java 1.15 - 1.16.1' },
  { value: '1_14', label: 'Java 1.14' },
  { value: 'BR_1_14', label: 'Bedrock 1.14+' },
  { value: '', label: 'More versions coming soon!', isDisabled: true },
];

const resolutionOptions = [
  { value: 16, label: '16x' },
  { value: 32, label: '32x' },
  { value: 64, label: '64x' },
];

const sharedFunc = (provided, state) => {
  let bg;
  if (state.isDisabled) bg = c_INACTIVE;
  else if (state.isSelected) bg = c_ACTIVE;
  else bg = c_ACTION;

  return {
    ...provided,
    backgroundColor: bg,
    border: 'none',
    color: c_PRIMARY,
  };
};

const styles = {
  control: sharedFunc,
  menu: sharedFunc,
  option: sharedFunc,
  placeholder: sharedFunc,
  singleValue: sharedFunc,
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: c_PRIMARY,
    ':hover': {
      color: 'white',
    },
  }),
};

export default ({ handleInput, onDownload, onClose, enableResolution }) => (
  <InfoPopup onReject={onClose}>
    <div className="wrapper">
      <h1>Download your resource pack</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="packName">Pack name:</label>
            </td>
            <td>
              <TextInput
                id="packName"
                placeholder="Pack name"
                onChange={(e) => handleInput(e, 'name')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="packDesc">Pack description:</label>
            </td>
            <td>
              <TextInput
                id="packDesc"
                placeholder="Pack description"
                onChange={(e) => handleInput(e, 'description')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="version">Minecraft Version: </label>
            </td>
            <td>
              <Select
                options={selectOptions}
                styles={styles}
                defaultValue={selectOptions[0]}
                isSearchable={false}
                onChange={(e) => handleInput(e, 'version')}
              />
            </td>
          </tr>
          {enableResolution && (
            <tr>
              <td>
                <label htmlFor="resolution">Bedrock block pixels: </label>
              </td>
              <td>
                <Select
                  options={resolutionOptions}
                  styles={styles}
                  defaultValue={resolutionOptions[0]}
                  isSearchable={false}
                  onChange={(e) => handleInput(e, 'resolution')}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <Button onClick={onClose}>Go back</Button>
      <Button onClick={onDownload}>Download resource pack</Button>
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
    `}</style>
  </InfoPopup>
);
