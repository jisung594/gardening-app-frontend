import React from 'react'
// import React, { Component } from 'react'

// class Question extends Component {
const Question = props => {
  let { questionObj, clickHandler } = props;

  return (
    <div className="question-li">
      <h4 onClick={()=>clickHandler(questionObj)}>{questionObj.question_str}</h4>
    </div>
  )
}

export default Question;
