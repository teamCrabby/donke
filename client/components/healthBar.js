import React, { Component } from 'react';
import { Heart } from '../components';
import { connect } from 'react-redux';


class HealthBar extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="healthBar">
        <div>
          <img id="healthBar" src={`../img/healthTab${this.props.health}.svg`} width="200" height="150" />
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