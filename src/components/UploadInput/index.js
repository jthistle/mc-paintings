import React from 'react';

export default ({ callback }) => {
  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={callback}
        className="fileInput"
      />
      <style jsx>{`
        .fileInput {
        }
      `}</style>
    </>
  );
};
