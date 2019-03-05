import React, { Component } from 'react';
// import Question from './Question'

// const QuestionForm = props => {
//   let { plant } = props;

class QuestionForm extends Component {

  state = {
    name: "",
    question: "",
    plant_id: this.props.plant.id,
    answers: {}
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()

    this.props.submitHandler(this.state)

    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.state.nameInput,
        question: this.state.questionInput,
        plant_id: this.state.plantId,
        answers: this.state.answers
      })
    })

    this.setState({
      name: "",
      question: "",
      plant_id: this.props.plant.id,
      answers: {}
    })
  }


  render () {
    return (
      <div>
        <form className="ui form" onSubmit={this.submitHandler}>
          <h4 className="ui dividing header">Ask about {this.props.plant.name}</h4>
            <div className="field">
              <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Your Name"/>
            </div>
            <div className="field">
              <input type="text" name="question" value={this.state.question} onChange={this.changeHandler} placeholder="Question"/>
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default QuestionForm;
