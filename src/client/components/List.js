import React from 'react';

const List = (props) => {
  const { isAuthenticated, trackArr, handleDeleteOption, resultObj } = props;
  return (
    <div>
      <ul>
        {trackArr.map((todo, i) => {
          return <li
            key={`todo${i}`}
            onClick={
              (e) => {
                handleDeleteOption(todo);
              }
            }
          >
            {todo}
          </li>
        })}

      </ul>
    </div>
  )
}

export default List;