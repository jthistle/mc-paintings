import React from 'react';
import Header from '../Header';

const Column = ({ children }) => (
  <div className="column">
    {children}
    <style jsx>{`
      .column {
        margin: 0 0.25rem;
        padding: 1rem 0.25rem;
        flex-grow: 1;
        flex-basis: 0;
      }
    `}</style>
  </div>
);

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="main">{children}</div>
    <style jsx>{`
      .main {
        box-sizing: border-box;
        padding: 0 1rem;
        display: flex;
        justify-content: space-evenly;
      }
    `}</style>
  </div>
);

export { Column };
export default Layout;
