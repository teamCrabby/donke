import React, { Component } from 'react';
import { grassLeave } from '../library/animations';
import { connect } from 'react-redux';


export class Grass extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (this.props.health === 9) {
      grassLeave()
    }
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

