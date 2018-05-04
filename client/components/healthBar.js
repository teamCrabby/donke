import React, { Component } from 'react';
import { Heart } from '../components';
import { connect } from 'react-redux';


export default class HealthBar extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="healthBar">
        <div>
          <img id="healthBar" src="../img/healthTab10.svg" width="300" height="250" />
          <img id="healthBar" src="../img/healthTab4.svg" width="300" height="250" />
        </div>
        <div>
          <Heart />
        </div>
      </div>
    );
  }
}