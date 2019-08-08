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
        min-width: 300px;
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

      @media (max-width: 600px) {
        .main {
          flex-wrap: wrap;
        }
      }
    `}</style>
  </div>
);

export { Column };
export default Layout;
