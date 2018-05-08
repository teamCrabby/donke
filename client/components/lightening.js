import React, { Component } from 'react';
import {  } from '../library/animations';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';

export class Lightening extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.health === 3) {
            lighteningEnter("#lightening1")
            playAudio('thunder');
        }
        if (this.props.health === 2) {
            lighteningEnter('#lightening2');
        }
        if (this.props.health === 1) {
            lighteningEnter('#lightening3');
        }
    }

    render() {

        return (
            <div>
                {this.props.health < 4 ? <img id="lightening1" src="../img/lightening.svg" width="220" height="220" /> : null}
                {this.props.health < 3 ? <img id="lightening2" src="../img/lightening.svg" width="220" height="220" /> : null}
                {this.props.health < 2 ? <img id="lightening3" src="../img/lightening.svg" width="220" height="220" /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        health: state.health
    }
}


export default connect(mapStateToProps)(Lightening)