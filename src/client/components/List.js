import React from 'react';

const List = (props) => {
  const { isAuthenticated, trackArr } = props;
  return (
    <div>
      <ul>
        {trackArr.map((todo, i) => {
          return <li key={`todo${i}`}>{todo}</li>
        })}
      </ul>
    </div>
  )
}

export default List;