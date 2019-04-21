import React, { Component } from 'react';
import Question from './Question';
import Answer from './Answer';
import QuestionForm from './QuestionForm';
import AnswerForm from './AnswerForm';

// const PlantProfile = (props) => {
//   let { plant } = props;

class PlantProfile extends Component {

  state = {
    questions: [],
    clickedQuestion: {},
    clickedQF: false,
    clickedAF: false
  }

// FETCHES QUESTIONS DATA FOR SPECIFIC PLANT ---------------
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/questions')
      .then(res => res.json())
      .then(questions => {
        let plantQuestions = questions.filter(questionObj => {
          return questionObj.plant_id === this.props.plant.id
        })
        this.setState({
          questions: plantQuestions
        })
      })
  }

// ************************ QUESTION FORM ONLY *********************************
  // saves the question clicked on (to state) ----------
  clickHandlerQF = (questionObj) => {
    this.setState({
      clickedQuestion: questionObj
    })
  }

  // shows / hides question form -----------------
  clickFormHandlerQF = () => {
    if (this.state.clickedQF === false) {
      this.setState({
        clickedQF: true
      })
    } else {
      this.setState({
        clickedQF: false
      })
    }
  }

  // submit input from question form ------------
  submitHandlerQF = (obj) => {
    this.setState({
      questions: [obj, ...this.state.questions]
    })
  }
// -----------------------------------------------------------------------------

// ************************ ANSWER FORM ONLY *********************************
clickFormHandlerAF = () => {
  if (this.state.clickedAF === false) {
    this.setState({
      clickedAF: true
    })
  } else {
    this.setState({
      clickedAF: false
    })
  }
}

submitHandlerAF = (obj) => {

  let answers = [obj, ...this.state.clickedQuestion.answers]
  let clickedQuestionCopy = this.state.clickedQuestion
  clickedQuestionCopy.answers = answers

  this.setState({
    clickedQuestion: clickedQuestionCopy
  })

  fetch(`http://localhost:3000/api/v1/questions/${this.state.clickedQuestion.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // how do you add the object to this question's list of answers **************
      // [this.state.clickedQuestion.answers]: [obj, ...this.state.clickedQuestion.answers]
      answers:
        Array.isArray(this.state.clickedQuestion.answers) === true
        ? [obj, ...this.state.clickedQuestion.answers]
        : [obj, this.state.clickedQuestion.answers]

    })
  })
}



  render() {

    // let answersList = () => {
    //   Array.isArray(this.state.clickedQuestion.answers) === true
    //   ? this.state.clickedQuestion.answers.map(answerObj => {
    //     return <Answer key={answerObj.name} answer={answerObj} />
    //   })
    //   : <Answer answer={this.state.clickedQuestion.answers} />
    // }


    let questionsList = [...this.state.questions].map(questionObj => {
      return <Question key={questionObj.id} questionObj={questionObj} plant={this.props.plant} clickHandler={this.clickHandlerQF} />
    })


    return (
      <div className="plant-container">

{/* ROW 1 / COLUMN 1 ------------------------------------------------------------*/}
          <div className="imagebox">
            <img className="main-image" src={this.props.plant.img} alt=""/>
          </div>

{/* ROW 1 / COLUMN 2 ------------------------------------------------------------*/}
          <div className="info-section">

              <div>
                <h2 className="profile-header">{this.props.plant.name}</h2>
              </div>

              <div className="wrapper-two">
                  <div>
                  <label>Scientific Name:</label>
                      <p className="detail">{this.props.plant.scientific_name}</p>
                    <label>Family:</label>
                      <p className="detail">{this.props.plant.family_name}</p>
                    <label>Flower Color:</label>
                      <p className="detail">{this.props.plant.flower_color}</p>
                    <label>Foliage Color:</label>
                      <p className="detail">{this.props.plant.foliage_color}</p>
                    <label>Foliage Texture:</label>
                      <p className="detail">{this.props.plant.foliage_texture}</p>
                    <label>Shade Tolerance:</label>
                      <p className="detail">{this.props.plant.shade_tolerance}</p>
                    <label>Drought Tolerance:</label>
                      <p className="detail">{this.props.plant.drought_tolerance}</p>
                  </div>
                  <div>
                    <label>Growth Period:</label>
                      <p className="detail">{this.props.plant.growth_period}</p>
                    <label>Bloom Period:</label>
                      <p className="detail">{this.props.plant.bloom_period}</p>
                    <label>Temperature Minimum:</label>
                      <p className="detail">{this.props.plant.temperature_minimum}</p>
                    <label>PH Minumum:</label>
                      <p className="detail">{this.props.plant.ph_minimum}</p>
                    <label>PH Maximum:</label>
                      <p className="detail">{this.props.plant.ph_maximum}</p>
                    <label>Mature Height:</label>
                      <p className="detail">{this.props.plant.mature_height}</p>
                    <label>Duration:</label>
                      <p className="detail">{this.props.plant.duration}</p>
                  </div>
              </div>

          </div>
{/*------------------------------------------------------------*/}

              {/* ROW 2 -------------------------------------------------------*/}
                <div className="questions-container">
                <h2 id="faq">QUESTIONS</h2>
                  <div id="qa-list">
                    {questionsList}
                  </div>
                  <div>
                    <button className="ui button" onClick={this.clickFormHandlerQF}>Ask</button>
                  </div>
                  <div>
                    {
                      this.state.clickedQF === true
                      ? <QuestionForm plant={this.props.plant} submitHandler={this.submitHandlerQF}/>
                      : null
                    }
                  </div>
                </div>

                <div className="answers-container">
                  <h2 id="clicked-question">{this.state.clickedQuestion.question}</h2>
                  <div id="qa-list">
                    {
                      Array.isArray(this.state.clickedQuestion.answers) === true
                      ? this.state.clickedQuestion.answers.map(answerObj => {
                        return <Answer answer={answerObj} />
                        })
                      : <Answer answer={this.state.clickedQuestion.answers} />
                    }
                  </div>
                  <div>
                    <button className="ui button" onClick={this.clickFormHandlerAF}>Answer</button>
                  </div>

                  <div>
                    {
                      this.state.clickedAF === true
                      ? <AnswerForm question={this.state.clickedQuestion} submitHandler={this.submitHandlerAF}/>
                      : null
                    }
                  </div>
                </div>

      </div>
    )
  }
}

export default PlantProfile
