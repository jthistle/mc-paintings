import React from 'react';
import {
  c_ACTION,
  c_HIGHLIGHT,
  c_ACTIVE,
  c_INACTIVE,
  c_INACTIVE_TEXT,
  c_PRIMARY,
} from '../../theme';

const ButtonInternals = ({ children, onClick, disabled, scheme }) => {
  let primary = c_PRIMARY;
  let secondary = c_ACTION;
  let secondaryHover = c_HIGHLIGHT;
  let secondaryActive = c_ACTIVE;
  let primaryDisabled = c_INACTIVE_TEXT;
  let secondaryDisabled = c_INACTIVE;

  switch (scheme) {
    case 'yellow':
      primary = '#4C4200';
      secondary = '#FFDE00';
      secondaryHover = '#FFEB64';
      secondaryActive = '#FFEB64';
      primaryDisabled = primary;
      secondaryDisabled = '#C6AC00';
      break;
    case 'black':
      primary = '#EEE';
      secondary = '#111';
      secondaryHover = '#222';
      secondaryActive = '#333';
      primaryDisabled = '#AAA';
      secondaryDisabled = '#111';
      break;
  }

  return (
    <div className="button" onClick={onClick} disabled={disabled}>
      {children}
      <style jsx>{`
        .button {
          display: inline-block;
          padding: 0 1rem;
          height: 3rem;
          line-height: 3rem;
          border-radius: 0.25rem;
          background: ${secondary};
          transition: all 0.3s;
          text-align: center;
          font-weight: bold;
          margin: 0 0.25rem;
          text-decoration: none;
          color: ${primary};
        }

        .button:hover {
          background: ${secondaryHover};
        }

        .button:active {
          background: ${secondaryActive};
        }

        .button[disabled] {
          background: ${secondaryDisabled};
          color: ${primaryDisabled};
        }
      `}</style>
    </div>
  );
};

const Button = ({ external, children, ...props }) => {
  if (external) {
    return (
      <a href={external} target="_blank">
        <ButtonInternals {...props}>{children}</ButtonInternals>
      </a>
    );
  } else {
    return <ButtonInternals {...props}>{children}</ButtonInternals>;
  }
};

export default Button;
