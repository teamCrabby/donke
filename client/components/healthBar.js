import React, { Component } from 'react';
import { Heart } from '../components';
import { connect } from 'react-redux';


class HealthBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      health: this.props.health
    }

  }
  componentDidMount() {

  }

  render() {
    console.log('are you right', `../img/healthTab${this.state.health}.svg`)
    return (
      <div className="healthBar">
        <div>
          <img id="healthBar" src={`../img/healthTab${this.state.health}.svg`} width="300" height="250" />
        </div>
        <div>
          <Heart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.health
  }
}

const mapDispatchToProps = dispatch => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(HealthBar)