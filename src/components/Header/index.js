import React from 'react';
import { c_HEADER } from '../../theme';

const style = {
  backgroundColor: c_HEADER,
  width: '100%',
  padding: '0.3rem 2rem',
  boxSizing: 'border-box',
};

const heading = {
  fontSize: '1.5rem',
};

export default () => {
  return (
    <div style={style}>
      <h1 style={heading}>Minecraft painting creator</h1>
    </div>
  );
};
