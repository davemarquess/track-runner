import React from 'react';

const Reset = (props) => {
  return (
    <div>
      <button onClick={props.handleReset}>Reset Track</button>
      <button onClick={props.handleSave}>Save</button>
    </div>
  );
};

export default Reset;