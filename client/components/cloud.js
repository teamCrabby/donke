import React, { Component } from 'react';
// import { clouds } from '../library/animations'

export default class Cloud extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // clouds()
  }

  render() {

    return (
      <div>
        <img id="cloud1" src="../img/cloud.svg" width="220" height="220" />
        <img id="cloud2" src="../img/cloud.svg" width="220" height="220" />
        <img id="cloud3" src="../img/cloud.svg" width="300" height="300" />
        <img id="cloud4" src="../img/cloud.svg" width="220" height="220" />
        <img id="cloud5" src="../img/cloud.svg" width="220" height="220" />
      </div>
    );
  }
}