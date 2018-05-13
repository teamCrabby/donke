import React, { Component } from 'react';
import { heartBeat } from '../library/animations'
import { connect } from 'react-redux'

class Heart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    heartBeat()
  }

  render() {
    return (
      <div>
        {this.props.health >= 1
          ?
          <img id="heart" src="../img/heart.svg" width="30" height="30" />
          :
          <img id="brokenheart" src="../img/brokenheart.svg" width="30" height="30" />
        }
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    health: state.health,

  }
}

export default connect(mapStateToProps)(Heart)
