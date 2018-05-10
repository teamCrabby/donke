import React, { Component } from 'react';
import { clouds, cloudEnter } from '../library/animations';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';

export class Cloud extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    clouds()
    if (this.props.status === 'needBreak'){
      if (this.props.health === 8) cloudEnter("#cloud1")
      if (this.props.health === 7) cloudEnter('#cloud2');
      if (this.props.health === 6) cloudEnter('#cloud3');
      if (this.props.health === 5) cloudEnter('#cloud4');
      if (this.props.health === 4) cloudEnter('#cloud5');
    }
  }

  render() {

    return (
      <div>
        {this.props.health < 9 ? <img id="cloud1" src="../img/cloud.svg" width="220" height="220" /> : null}
        {this.props.health < 8 ? <img id="cloud2" src="../img/cloud.svg" width="220" height="220" /> : null }
        {this.props.health < 7 ? <img id="cloud3" src="../img/cloud.svg" width="220" height="220" /> : null}
        {this.props.health < 6 ? <img id="cloud4" src="../img/cloud.svg" width="220" height="220" /> : null}
        {this.props.health < 5 ? <img id="cloud5" src="../img/cloud.svg" width="220" height="220" /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.health,
    status: state.status
  }
}


export default connect(mapStateToProps)(Cloud)