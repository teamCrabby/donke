import React, { Component } from 'react';
import { dragHat, hatLeave } from '../library/animations';
import { connect } from 'react-redux';


export class PartyHat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    dragHat()
    if (this.props.avatar.health === 9 && this.props.status === 'needBreak') {
      hatLeave()
    }
  }

  render() {
    return (
      <div className="draggable-box">
        <img className="draggable-item draggable-hat" id="hat" src="../img/partyHat.svg" width="80" height="80" />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    avatar: state.avatar,
    status: state.status
  }
}


export default connect(mapStateToProps)(PartyHat)