import React from 'react';

const Reset = (props) => {
  return (
    <div>
      <button id="saveButton1" onClick={props.handleReset}>Reset Track</button>
      <button id="saveButton2" onClick={props.handleSave}>Save</button>
      <button onClick={props.handleRetrieve}>Explore</button>
      {props.areTracksFetched && props.fetchedTracksDisplay}
    </div>
  );
};

export default Reset;