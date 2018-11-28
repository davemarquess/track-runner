import React from 'react';

const Question = (props) => {
  const { handleQuestion, questionArr } = props;
  return (
    <div>
      <p>{questionArr}</p>
    </div>
  )
}

export default Question;