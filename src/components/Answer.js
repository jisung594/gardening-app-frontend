import React from 'react';

const Answer = (props) => {
  let { answer } = props;

  // using ternary below to avoid error when there are no props
  // yet to be found/passed down (props will initially by "undefined")

  return (
    answer ? (
      <div className="answer-div">
        <h4 className="answer-item">{answer.answer_str}</h4>
        <p className="answer-user">{answer.name}</p>
        <br/>
      </div>
    ) : ""
  )
}

export default Answer;
