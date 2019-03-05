// import React from 'react'
import React, { Component } from 'react'

// const Question = props => {
//   let { questionObj, clickHandler } = props;

class Question extends Component {

  render () {
    return (
      <div className="question-li">
        <h4 onClick={()=>this.props.clickHandler(this.props.questionObj)}>{this.props.questionObj.question}</h4>
      </div>
    )
  }
}

export default Question;
