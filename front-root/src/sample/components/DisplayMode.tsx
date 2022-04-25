import React from 'react';
const DisplayMode = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 10,
        bottom: 15,
        zIndex: 100,
        backgroundColor: '#c0c0c03d',
        borderRadius: 4,
        padding: '4px 8px',
        boxShadow: '2px 2px 2px 1px #c2c2c2',
      }}
      data-test-id='mode'
    >
      {process.env.NODE_ENV}
    </div>
  );
};
export default DisplayMode;
