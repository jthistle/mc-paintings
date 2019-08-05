import React from 'react';
import Header from '../Header';

const Layout = ({ columns, children, ...props }) => {
  return (
    <div>
      <Header />
      <div className="main">
        {columns === 2 ? (
          <>
            <div className="column">{props.left}</div>
            <div className="column">{props.right}</div>
          </>
        ) : (
          children
        )}
      </div>
      <style jsx>{`
        .main {
          box-sizing: border-box;
          padding: 0 1rem;
          display: flex;
        }

        .column {
          width: 50%;
          margin: 0 0.25rem;
          padding: 1rem 0.25rem';
        }
      `}</style>
    </div>
  );
};

export default Layout;
