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

import React, { useEffect } from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from 'react-select';

import mediaQuery from '../../components/media';
import { useMedia } from 'react-media';

import { c_ACTION, c_PRIMARY, c_ACTIVE, c_INACTIVE } from '../../theme';

const selectOptions = [
  { value: '1_19', label: 'Java 1.19' },
  { value: '1_18_2', label: 'Java 1.18.2' },
  { value: '1_18', label: 'Java 1.18 - 1.18.1' },
  { value: '1_17', label: 'Java 1.17 - 1.17.1' },
  { value: '1_16', label: 'Java 1.16.2 - 1.16.5' },
  { value: '1_15', label: 'Java 1.15 - 1.16.1' },
  { value: '1_14', label: 'Java 1.14 - 1.14.4' },
  { value: '1_13', label: 'Java 1.13 - 1.13.2' },
  { value: '1_11', label: 'Java 1.11 - 1.12.2' },
  { value: '1_9', label: 'Java 1.9 - 1.10.2' },
  { value: '1_6', label: 'Java 1.6.1 - 1.8.9' },
  { value: 'BR_1_14', label: 'Bedrock 1.14+' },
  // { value: '', label: 'More versions coming soon!', isDisabled: true },
];

// Default versions selected for different
const DEFAULT_DESKTOP = 1;
const DEFAULT_MOBILE = selectOptions.length - 1;

const resolutionOptions = [
  { value: 16, label: 'Native (16x)' },
  { value: 64, label: 'Low (64x)' },
  { value: 128, label: 'Medium (128x)' },
  { value: 256, label: 'High (256x)' },
  { value: 512, label: 'Ultra (512x)' },
];
const DEFAULT_RES = 3;

const dropdownStyler = (provided, state) => {
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
  control: dropdownStyler,
  menu: dropdownStyler,
  option: dropdownStyler,
  placeholder: dropdownStyler,
  singleValue: dropdownStyler,
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: c_PRIMARY,
    ':hover': {
      color: 'white',
    },
  }),
};

export default ({
  handleInput,
  onDownload,
  onClose,
  processing,
  enableResolution,
}) => {
  const media = useMedia(mediaQuery);
  const def = media.mobile ? DEFAULT_MOBILE : DEFAULT_DESKTOP;

  useEffect(() => {
    handleInput(
      {
        value: selectOptions[def].value,
      },
      'version'
    );
    // eslint-disable-next-line
  }, []);

  return (
    <InfoPopup onReject={onClose}>
      <div className="wrapper">
        <h1>Download your resource pack</h1>
        <div className="optionsForm">
          <div>
            <label htmlFor="packName">Pack name:</label>
          </div>
          <div>
            <TextInput
              id="packName"
              placeholder="Pack name"
              onChange={(e) => handleInput(e, 'name')}
            />
          </div>
          <div>
            <label htmlFor="packDesc">Pack description:</label>
          </div>
          <div>
            <TextInput
              id="packDesc"
              placeholder="Pack description"
              onChange={(e) => handleInput(e, 'description')}
            />
          </div>
          <div>
            <label htmlFor="version">Minecraft Version: </label>
          </div>
          <div>
            <Select
              options={selectOptions}
              styles={styles}
              defaultValue={selectOptions[def]}
              isSearchable={false}
              onChange={(e) => handleInput(e, 'version')}
            />
          </div>
          {enableResolution && (
            <>
              <div>
                <label htmlFor="resolution">Resolution: </label>
              </div>
              <div>
                <Select
                  options={resolutionOptions}
                  styles={styles}
                  defaultValue={resolutionOptions[DEFAULT_RES]}
                  isSearchable={false}
                  onChange={(e) => handleInput(e, 'resolution')}
                />
              </div>
            </>
          )}
        </div>
        <br />
        <Button onClick={onClose}>Go back</Button>
        <Button onClick={onDownload} disabled={processing} scheme={'green'}>
          {processing ? `Working...` : `Download resource pack`}
        </Button>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .optionsForm {
          margin: 0;
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          text-align: left;
          flex-basis: 100%;
          padding: 0 6rem;
        }

        .optionsForm div {
          flex-basis: 50%;
          margin: 0.2rem 0;
        }

        label {
          padding: 0 1rem;
          text-align: left;
          width: 100%;
          display: block;
          margin: 0;
        }

        @media (max-width: 960px) {
          .optionsForm {
            padding: 0;
          }
        }

        @media (max-width: 640px) {
          .optionsForm {
            width: 100%;
            margin-bottom: 0.5rem;
            padding: 0 1rem;
          }

          .optionsForm div {
            flex-basis: 100%;
            margin: none;
          }

          label {
            padding: 0.5rem 0 0.2rem 0;
          }
        }
      `}</style>
    </InfoPopup>
  );
};
