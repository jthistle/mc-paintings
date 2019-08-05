import React from 'react';
import Header from '../Header';

const style = {
  boxSizing: 'border-box',
  padding: '0 1rem',
  display: 'flex',
};

const columnStyle = {
  width: '50%',
  margin: '0 0.25rem',
  padding: '1rem 0.25rem',
};

const Layout = ({ columns, children, props }) => {
  return (
    <div>
      <Header />
      <div style={style}>
        {columns === 2 ? (
          <>
            <div style={columnStyle}>{props.left}</div>
            <div style={columnStyle}>{props.right}</div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Layout;
