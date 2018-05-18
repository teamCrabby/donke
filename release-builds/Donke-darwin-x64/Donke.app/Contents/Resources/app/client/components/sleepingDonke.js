import React, { Component } from 'react';
import { breathing } from '../library/animations';
import { connect } from 'react-redux';



export class SleepingDonke extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        breathing();
    }


    render() {

        return (
            <div id="sleeping">
                <img id="sleepingDonke" src="../img/sleeping.svg" />
                <img id="belly" src="../img/belly.svg" />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        avatar: state.avatar
    }
}


export default connect(mapStateToProps)(SleepingDonke)