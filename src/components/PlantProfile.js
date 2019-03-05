import React, { Component } from 'react';
import Question from './Question';
import Answer from './Answer';
import QuestionForm from './QuestionForm'

// const PlantProfile = (props) => {
//   let { plant } = props;

class PlantProfile extends Component {

  state = {
    questions: [],
    clickedQuestion: {},
    clicked: false
  }

// maybe move this, state, and all related functions into PlantCard
  componentDidMount() {
    fetch('http://localhost:3000/questions')
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


  clickHandler = (questionObj) => {
    this.setState({
      clickedQuestion: questionObj
    })
  }


  // shows / hides form
  clickFormHandler = () => {
    if (this.state.clicked === false) {
      this.setState({
        clicked: true
      })
    } else {
      this.setState({
        clicked: false
      })
    }
  }


  render() {


    let questionsList = [...this.state.questions].map(questionObj => {
      return <Question key={questionObj.id} questionObj={questionObj} plant={this.props.plant} clickHandler={this.clickHandler}/>
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
                    <label className="detail">Scientific Name:</label>
                      <p>{this.props.plant.scientific_name}</p>
                    <label className="detail">Family:</label>
                      <p>{this.props.plant.family_name}</p>
                    <label className="detail">Flower Color:</label>
                      <p>{this.props.plant.flower_color}</p>
                    <label className="detail">Foliage Color:</label>
                      <p>{this.props.plant.foliage_color}</p>
                    <label className="detail">Foliage Texture:</label>
                      <p>{this.props.plant.foliage_texture}</p>
                    <label className="detail">Shade Tolerance:</label>
                      <p>{this.props.plant.shade_tolerance}</p>
                    <label className="detail">Drought Tolerance:</label>
                      <p>{this.props.plant.drought_tolerance}</p>
                  </div>
                  <div>
                    <label className="detail">Growth Period:</label>
                      <p>{this.props.plant.growth_period}</p>
                    <label className="detail">Bloom Period:</label>
                      <p>{this.props.plant.bloom_period}</p>
                    <label className="detail">Temperature Minimum:</label>
                      <p>{this.props.plant.temperature_minimum}</p>
                    <label className="detail">PH Minumum:</label>
                      <p>{this.props.plant.ph_minimum}</p>
                    <label className="detail">PH Maximum:</label>
                      <p>{this.props.plant.ph_maximum}</p>
                    <label className="detail">Mature Height:</label>
                      <p>{this.props.plant.mature_height}</p>
                    <label className="detail">Duration:</label>
                      <p>{this.props.plant.duration}</p>
                  </div>
              </div>

          </div>
{/*------------------------------------------------------------*/}

              {/* ROW 2 -------------------------------------------------------*/}
                <div className="questions-container">
                <h2 id="faq">QUESTIONS</h2>
                  <div id="questions-list">
                    {questionsList}
                  </div>
                  <div>
                    <button className="ui button" onClick={this.clickFormHandler}>Ask Away</button>
                  </div>
                  <div>
                    {
                      this.state.clicked === true
                      ? <QuestionForm plant={this.props.plant}/>
                      : null
                    }
                  </div>
                </div>

                <div className="answers-container">
                  <h2>{this.state.clickedQuestion.question}</h2>
                  {
                    Array.isArray(this.state.clickedQuestion.answers) === true
                    ? this.state.clickedQuestion.answers.map(answerObj => {
                      return <Answer key={answerObj.name} answer={answerObj} />
                    })
                    : <Answer answer={this.state.clickedQuestion.answers} />
                  }
                </div>

      </div>
    )
  }
}

export default PlantProfile
