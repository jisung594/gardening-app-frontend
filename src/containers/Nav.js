import React, { Component } from 'react';
import Search from '../components/Search'
// import PlantContainer from './PlantContainer'

// <div className="or"></div>
class Nav extends Component {

  render() {
    return (
      <div className="wrapper">

        <div className="button-menu">
          <div className="ui buttons">
            <button id="growability" className="ui toggle button" onClick={this.props.clickHandler}>GROWABILITY</button>
            <button id="alphabetical" className="ui toggle button" onClick={this.props.clickHandler}>A-Z</button>
            <button id="plant-type" className="ui toggle button" onClick={this.props.clickHandler}>TYPE</button>
          </div>
        </div>

        <div className="main-header">
          <span id="logo-name">CROPSCITY</span>
          <br/>
          <span id="sub-header">The City Farmer's Resource</span>
        </div>

        <div className="search-container">
          <Search changeHandler={this.props.changeHandler}/>
        </div>

      </div>
    )
  }
}

export default Nav;
