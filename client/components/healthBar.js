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
          <img id="healthBar" src="../img/healthBar.svg" width="30" height="450" />
          <img id="healthTab" src="../img/healthTab.svg" width="300" height="430" />
        </div>
        <div>
          <Heart />
        </div>
      </div>
    );
  }
}