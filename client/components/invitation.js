import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'
import store, { setPlaypenStatus, setInvited } from '../store'


export class Invitation extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: "Butt",
            playpenName: "Butt's Playpen",
        }
        this.handleClickYes = this.handleClickYes.bind(this)
        this.handleClickNo = this.handleClickNo.bind(this)
    }

    componentDidMount(){
        console.log('playpenId is...', this.props.avatar.playpenId)
        db.collection("playPen").doc(`${this.props.avatar.playpenId}`).get()
        .then((res) => {
            console.log("res is..", res.data())
            let playpen = res.data()
            this.setState({ playpenName: playpen.name })
        })
        .catch((error) => console.log(`Unable to set playpen ${error.message}`))
    }

    handleClickYes(){
        this.props.setPlaypen(true)
        db.collection("avatars").doc(`${this.props.avatar.id}`).update({invited: false})
    }

    handleClickNo(){
        db.collection("avatars").doc(`${this.props.avatar.id}`).update({ invited: false, playpenId: null })
    }

    render(){
        return (
            <div className='navbarForm navbar-container navbar-wrapper' id='invitation'>
                <p>{this.props.avatar.name} has invited you to join them in {this.state.playpenName}! Would you like to join this playpen?</p>
                <div id="invitation-btns">
                    <button onClick={this.handleClickYes}>Yes</button>
                    <button onClick={this.handleClickNo}>No</button> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        avatar: state.avatar
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        setPlaypen(bool) {
            dispatch(setPlaypenStatus(bool))
        },
        setStoreInvited(bool) {
            dispatch(setInvited(bool))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitation)