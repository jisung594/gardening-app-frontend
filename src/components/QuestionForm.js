import React, { Component } from 'react';

// const QuestionForm = props => {
//   let { plant } = props;

class QuestionForm extends Component {

  state = {
    nameInput: "",
    questionInput: ""
  }

  // changeHandler = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // submitHandler = () => {
    // fetch("http://localhost:3000/questions")
  // }


  render () {
    return (
      <div>
        <form className="ui form" onSubmit={this.submitHandler}>
          <h4 className="ui dividing header">Ask about {this.props.plant.name}</h4>
            <div className="field">
              <input type="text" name="nameInput" value={this.state.nameInput} onChange={this.changeHandler} placeholder="Your Name"/>
            </div>
            <div className="field">
              <input type="text" name="questionInput" value={this.state.questionInput} onChange={this.changeHandler} placeholder="Question"/>
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default QuestionForm;
