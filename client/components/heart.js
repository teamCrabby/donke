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
        {this.props.avatar.health === 0
          ?
          <img id="brokenheart" src="../img/brokenheart.svg" width="30" height="30" />
          :
          <img id="heart" src="../img/heart.svg" width="30" height="30" />
        }
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    avatar: state.avatar

  }
}

export default connect(mapStateToProps)(Heart)
