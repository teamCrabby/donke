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
    handleClickYes(){
<<<<<<< HEAD
        console.log('clicked yes')
=======
        console.log('in handle click yes')
>>>>>>> invitation-form
        this.props.setPlaypen(true)
        this.props.setStoreInvited(false)
        //render playpen
        //toggle invited to false
        //db.collections("avatar").doc(avatarId).update({invited: false})
    }
    handleClickNo(){
        console.log('in handle click no')
        this.props.setStoreInvited(false)
        //close window -- toggle invited to false and playpen id to null which should return normal view
        //db.collections("avatar").doc(avatarId).update({invited: false, playpenId: null})
    }

    render(){
        return (
            <div className='navbarForm navbar-container navbar-wrapper' id='invitation'>
                <p>{this.state.user} has invited you to join them in {this.state.playpenName}! Would you like to join this playpen?</p>
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