import React from 'react';
import { Link } from '@reach/router';

const CapturedLink = ({ to, capture, children, ...props }) => {
  let callback = () => {};
  if (capture) {
    callback = (e) => capture(to, e);
  }

  return (
    <Link to={to} onClick={callback} {...props}>
      {children}
    </Link>
  );
};

export default CapturedLink;
