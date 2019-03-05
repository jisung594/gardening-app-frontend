import React, { Component } from 'react';
import './App.css';
import PlantContainer from './containers/PlantContainer'
import Nav from './containers/Nav'
// import plantData from '../db.json'

class App extends Component {
  state = {
    plants: [],
    filteredPlants: [],
    searchTerm: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/plants")
      .then(res => res.json())
      .then(plantData => this.setState({
        plants: plantData,
        filteredPlants: plantData
      }))
  }

  changeHandler = (event) => {
    let filteredPlants = this.state.plants.filter(plantObj => {
      return plantObj.name.toLowerCase().includes(event.target.value)
    })
    this.setState({
      searchTerm: event.target.value,
      filteredPlants: filteredPlants
    })
  }

  clickHandler = (event) => {
    if (event.target.id === "growability") {
      let sortedByGrowable = this.state.plants.sort((p1,p2) => {
        return p2.growability - p1.growability
      })
      this.setState({
        filteredPlants: sortedByGrowable
      })
    } else {
      let sortedByName = this.state.plants.sort((p1,p2) => {
        return p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())
      })
      this.setState({
        filteredPlants: sortedByName
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Nav changeHandler={this.changeHandler} clickHandler={this.clickHandler} plants={this.state.filteredPlants}/>
        <PlantContainer plants={this.state.filteredPlants}/>
      </div>
    );
  }
}

export default App;
