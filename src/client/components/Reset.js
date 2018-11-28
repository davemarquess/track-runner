import React from 'react';

const Reset = (props) => {
  return (
    <div>
      <button onClick={props.handleReset}>Reset Track</button>
    </div>
  );
};

export default Reset;