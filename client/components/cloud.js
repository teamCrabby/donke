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
        <img id="cloud" src="../img/cloud.svg" width="30" height="30" />
      </div>
    );
  }
}