import React from 'react';

const Reset = (props) => {
  return (
    <div>
      <button id="saveButton1" onClick={props.handleReset}>Reset Track</button>
      <button id="saveButton2" onClick={props.handleSave}>Save</button>
      <button onClick={props.handleRetrieve}>Explore</button>
      {props.areTracksFetched && props.fetchedTracksDisplay}
      <button onClick={props.handleDelete}>Delete</button>
    </div>
  );
};

export default Reset;