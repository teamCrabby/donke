import React, { Component } from 'react';
import { sunRotate, sunLeave } from '../library/animations';
import { connect } from 'react-redux';



export class Sun extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    sunRotate();
    if (this.props.avatar.health === 8 && this.props.status === 'needBreak'){
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
    avatar: state.avatar,
    status: state.status
  }
}


export default connect(mapStateToProps)(Sun)