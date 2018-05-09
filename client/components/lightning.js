import React, { Component } from 'react';
import { lightningEnter } from '../library/animations';
import { connect } from 'react-redux';
import { playAudio } from '../library/audio';

export class Lightning extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.health === 3) {
            lightningEnter("#lightning1")
            playAudio('thunder');
        }
        if (this.props.health === 2) {
            lightningEnter('#lightning2');
        }
        if (this.props.health === 1) {
            lightningEnter('#lightning3');
        }
    }

    render() {

        return (
            <div>
                {this.props.health < 4 ? <img id="lightning1" src="../img/lightning.svg" width="220" height="220" /> : null}
                {this.props.health < 3 ? <img id="lightning2" src="../img/lightning.svg" width="220" height="220" /> : null}
                {this.props.health < 2 ? <img id="lightning3" src="../img/lightning.svg" width="220" height="220" /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        health: state.health
    }
}


export default connect(mapStateToProps)(Lightning)