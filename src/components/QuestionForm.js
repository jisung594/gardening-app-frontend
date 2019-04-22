import React, { Component } from 'react';
// import Question from './Question'

// const QuestionForm = props => {
//   let { plant } = props;

class QuestionForm extends Component {

  state = {
    question_str: "",
    user_id: 1,
    plant_id: this.props.plant.id
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()

    this.props.submitHandler(this.state)

    fetch("https://cropscity-api.herokuapp.com/api/v1/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question_str: this.state.question_str,
        user_id: this.state.user_id,
        plant_id: this.state.plant_id
      })
    })

    this.setState({
      question_str: "",
      user_id: 1,
      plant_id: this.props.plant.id
    })
  }


  render () {
    return (
      <div>
        <form className="ui form" onSubmit={this.submitHandler}>
          <h4 className="ui dividing header">Ask about {this.props.plant.name}</h4>
            <div className="field">
              <input type="text" name="question_str" value={this.state.question_str} onChange={this.changeHandler} placeholder="Question"/>
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default QuestionForm;
