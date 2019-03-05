import React from 'react';

const Answer = (props) => {
  let { answer } = props;

  console.log(answer)

  // using ternary below to avoid error when there are no props
  // yet to be found/passed down (props will initially by "undefined")

  return (
    answer ? (
      <div>
        <h4>{answer.answer_str}</h4>
        <li>{answer.name}</li>
      </div>
    ) : ""
  )
}

export default Answer;
