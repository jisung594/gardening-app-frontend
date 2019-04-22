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
    answers: [],
    clickedQuestion: {},
    filteredAnswers: [],
    clickedQF: false,
    clickedAF: false
  }

// FETCHES QUESTIONS DATA FOR SPECIFIC PLANT ---------------
  componentDidMount() {
    fetch('https://cropscity-api.herokuapp.com/api/v1/questions')
      .then(res => res.json())
      .then(questions => {
        let plantQuestions = questions.filter(questionObj => {
          return questionObj.plant_id === this.props.plant.id
        })
        this.setState({
          questions: plantQuestions
        })
      })

    fetch('https://cropscity-api.herokuapp.com/api/v1/answers')
      .then(res => res.json())
      .then(answers => {
        this.setState({
          answers: answers
        })
      })
  }

// ************************ QUESTION FORM ONLY *********************************
  // saves the question clicked on (to state) ----------
  clickHandlerQF = (questionObj) => {
    let filteredAnswers
    if (this.state.answers) {
      filteredAnswers = this.state.answers.filter(answerObj => {
        return answerObj.question_id === questionObj.id
      })
    }

    this.setState({
      clickedQuestion: questionObj,
      filteredAnswers: filteredAnswers
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
  fetch('https://cropscity-api.herokuapp.com/api/v1/answers', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(answerObj => {
      this.setState({
        filteredAnswers: [obj, ...this.state.filteredAnswers]
      })
    })
}


  render() {
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
                  <h2 id="clicked-question">{this.state.clickedQuestion.question_str}</h2>
                  <div id="qa-list">
                    { this.state.filteredAnswers.length > 0
                      ? this.state.filteredAnswers.map(answerObj => {
                        return <Answer key={answerObj.id} answer={answerObj} />
                      }) :
                      this.state.filteredAnswers.length === 0 && this.state.clickedQuestion.id
                      ? <h3>Be the first to answer this question!</h3>
                      : null
                    }
                  </div>
                  <div>
                    { this.state.clickedQuestion.id
                      ? <button className="ui button" onClick={this.clickFormHandlerAF}>Answer</button>
                      : null
                    }
                  </div>

                  <div>
                    {
                      this.state.clickedAF === true
                      ? <AnswerForm question={this.state.clickedQuestion} plant={this.props.plant} submitHandler={this.submitHandlerAF}/>
                      : null
                    }
                  </div>
                </div>

      </div>
    )
  }
}

export default PlantProfile
