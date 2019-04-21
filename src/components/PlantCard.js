import React, {Component} from 'react';

// const PlantCard = props => {
//   let { plant, clickHandler, clicked, details } = props;

class PlantCard extends Component {
  state = {
    clicked: false
  }

  clickHandler = () => {
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
    return (
      <div className="ui four wide column" onClick={this.clickHandler}>
          {this.state.clicked === true
            ? (<div className="ui raised card">
                <div className="detail-container">
                  <span>Scientific Name:</span>
                    <p className="detail">{this.props.plant.scientific_name}</p>
                  <span>Family:</span>
                    <p className="detail">{this.props.plant.family_name}</p>
                  <span>Flower Color:</span>
                    <p className="detail">{this.props.plant.flower_color}</p>
                  <span>Growability:</span>
                    <p className="detail">{this.props.plant.growability}/10</p>
                  <span>Type:</span>
                    <p className="detail">{this.props.plant.plant_type}</p>
                </div>

                <div>
                  <button className="ui inverted button" onClick={()=>this.props.buttonHandler(this.props.plant)}>Profile</button>

                </div>
              </div>)

            : (<div className="ui raised card">
                <div className="ui image">
                  <img className="ui fluid image" src={this.props.plant.img} alt=""/>
                </div>

                <div className="content">
                  <div className="header">
                    <h2 className="plant-name">{this.props.plant.name.toUpperCase()}</h2>
                  </div>
                </div>
              </div>)}
      </div>
    )
  }
}
// }

export default PlantCard;
