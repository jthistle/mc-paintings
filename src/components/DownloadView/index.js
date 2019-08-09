import React from 'react';
import InfoPopup from '../InfoPopup';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from 'react-select';

import { c_ACTION, c_PRIMARY, c_ACTIVE, c_INACTIVE } from '../../theme';

const selectOptions = [
  { value: '1_14', label: 'Minecraft 1.14' },
  { value: '', label: 'More versions coming soon!', isDisabled: true },
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

export default ({ handleInput, onDownload, onClose }) => (
  <InfoPopup onReject={onClose}>
    <div className="wrapper">
      <h1>Download your resource pack</h1>
      <table>
        <tr>
          <td>
            <label for="packName">Pack name:</label>
          </td>
          <td>
            <TextInput
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
            <TextInput
              id="packDesc"
              placeholder="Pack description"
              onChange={e => handleInput(e, 'description')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="version">Minecraft Version: </label>
          </td>
          <td>
            <Select
              options={selectOptions}
              styles={styles}
              defaultValue={selectOptions[0]}
            />
          </td>
        </tr>
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
