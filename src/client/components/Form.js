import React from 'react';

const Form = (props) => {
  const { handleChange, handleSubmit, currentText, question, handleQuestion } = props;
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <p>{question}</p>
        <input type="text" onChange={handleChange} id='input' />

        <button
          type="submit"
          id="submitButton"

        >Submit
        </button>
      </form>
    </div>
  )
}

export default Form;