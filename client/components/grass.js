import React, { Component } from 'react';


export default class Grass extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="panel">
        <img id="grass" src="../img/grass.svg" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    health: state.health
  }
}


export default connect(mapStateToProps)(Grass)

