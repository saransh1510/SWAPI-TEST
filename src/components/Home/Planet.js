// import npm packages
import React, { Component } from 'react';
import {
  Card,
} from 'reactstrap';

// import local files

class Planet extends Component {
  getSize(population) {
    if(population)
      return population/100000000;
    return 1;
  }
  render() {
    const population = this.getSize((this.props.planet && this.props.planet.population && Number(this.props.planet.population)) || null);
    return (
      <Card
        style={{
          marginTop: '3%',
          padding: '1%',
          height: `${45+population}px`,
          width: `${100+population}px`,
        }}
      >
        {this.props.planet && this.props.planet.name}
      </Card>
    )
  }
}

export default Planet;