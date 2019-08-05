import React from 'react';
import { styles } from './index.module.css'

const Layout = ({ props, children }) => {
  return (
    <div className="layout">
      { children }
    </div>
  );
}

export default Layout;
