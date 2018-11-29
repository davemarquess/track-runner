import React from 'react';
import { Line } from 'rc-progress';

const ProgressBar = (props) => {
  const { questionIndex } = props;

  return (
    <div>
      <br></br>
      {questionIndex > 0 &&
        <div>
          <Line
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={300}
            percent={(questionIndex / 9) * 100}
            strokeWidth="8"
            strokeColor="#4F1B7C"
            trailWidth="8"
          />
        </div>}
    </div>
  )
}

export default ProgressBar;