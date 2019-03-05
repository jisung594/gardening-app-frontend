import React, {Component} from 'react';
import PlantCard from '../components/PlantCard'
import PlantProfile from '../components/PlantProfile'

class PlantContainer extends Component {

  state = {
    clicked: false,
    buttonClicked: false,
    clickedPlant: {}
  }


  // if "profile" button PlantCard (back) is clicked, show PlantProfile, else show list of plants
  buttonHandler = (plant) => {
    this.setState({
      buttonClicked: !this.state.buttonClicked,
      clickedPlant: plant
    })
  }


  render() {
    // console.log("rendering", this.state.clickedPlant)

    let plantList = this.props.plants.map(plantObj => {
      return (
        // 1.
        <PlantCard key={plantObj.id} plant={plantObj} buttonHandler={this.buttonHandler}/>
      )
    })


    return (
      <div className="ui grid container">
        {this.state.buttonClicked === true
          // 2.
          ? <PlantProfile key={this.state.clickedPlant.id} plant={this.state.clickedPlant} />
          : plantList}
      </div>
    )
  }
}

export default PlantContainer;
