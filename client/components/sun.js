import React, { Component } from 'react';
import { sunRotate, sunLeave } from '../library/animations';
import { connect } from 'react-redux';



export class Sun extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    sunRotate();
    if (this.props.health === 8){
      sunLeave()
    }
  }


  render() {

    return (
      <div id="sun">
        <img id="sunFace" src="../img/sunFace.svg" />
        <img id="sunRays" src="../img/sunRays.svg" />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    health: state.health
  }
}


export default connect(mapStateToProps)(Sun)