import React, { Component } from 'react';

class AnswerForm extends Component {

  state = {
    user_id: 1,
    plant_id: this.props.plant.id,
    question_id: this.props.question.id,
    answer_str: ""
  }

  changeHandler = (e) => {
    this.setState({
      answer_str: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.props.submitHandler(this.state)

    this.setState({
      user_id: 1,
      plant_id: this.props.plant.id,
      question_id: 0,
      answer_str: ""
    })
  }


  render () {
    return (
      <div>
        <form className="ui form" onSubmit={this.submitHandler}>
          <h4 className="ui dividing header">What do you think?</h4>
            <div className="field">
              <input type="text" name="answer_str" value={this.state.answer_str} placeholder="Answer" onChange={this.changeHandler}/>
            </div>
            <div>
              <button className="ui button" type="submit">Submit</button>
            </div>
        </form>
      </div>
    )
  }
}

export default AnswerForm;
