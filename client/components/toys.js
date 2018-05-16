import React, { Component } from 'react'
import { dragToys } from '../library/animations'
import { connect } from 'react-redux'


export class Toys extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    dragToys()
  }

  render() {
    return (
      <div className="draggable-box">
        <div className="draggable-box">
          <img className="draggable-item draggable-icecream" id="icecream" src="../img/icecream.svg" width="50" height="50" />
        </div>
        <div className="draggable-box">
          <img className="draggable-item draggable-crown" id="crown" src="../img/crown.svg" width="50" height="50" />
        </div>
        <div className="draggable-box">
          <img className="draggable-item draggable-musicbox" id="musicbox" src="../img/musicbox.svg" width="100" height="100" />
        </div>
        <div className="draggable-box">
          <img className="draggable-item draggable-stash" id="stash" src="../img/stash.svg" width="30" height="30" />
        </div>
        <div className="draggable-box">
          <img className="draggable-item draggable-glasses" id="glasses" src="../img/glasses.svg" width="30" height="30" />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    status: state.status
  }
}


export default connect(mapStateToProps)(Toys)