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
                  <span className="detail">Scientific Name:</span>
                    <p>{this.props.plant.scientific_name}</p>
                  <span className="detail">Family:</span>
                    <p>{this.props.plant.family_name}</p>
                  <span className="detail">Flower Color:</span>
                    <p>{this.props.plant.flower_color}</p>
                  <span className="detail">Foliage Color:</span>
                    <p>{this.props.plant.foliage_color}</p>
                  <span className="detail">Foliage Texture:</span>
                    <p>{this.props.plant.foliage_texture}</p>
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
                    <h2 className="plant-name">{this.props.plant.name}</h2>
                  </div>
                </div>
              </div>)}
      </div>



    )
  }
}



// }

export default PlantCard;