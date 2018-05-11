import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { db, auth, authAdmin } from '../app'
import store, { setPlaypenStatus } from '../store'


export class Invitation extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: "Butt",
            playpenName: "Butt's Playpen",
            invited: true
        }
        this.handleClickYes = this.handleClickYes.bind(this)
        this.handleClickNo = this.handleClickNo.bind(this)
    }
    handleClickYes(){
        console.log('clicked yes')
        this.props.setPlaypen(true)
        this.setState({invited: false})
        //render playpen
        //toggle invited to false
        //db.collections("avatar").doc(avatarId).update({invited: false})
    }
    handleClickNo(){
        this.setState({ invited: false })
        //close window -- toggle invited to false and playpen id to null which should return normal view
        //db.collections("avatar").doc(avatarId).update({invited: false, playpenId: null})
    }

    render(){
        return (
            <div>
            {this.state.invited
                ? <div> 
                    <p>{this.state.user} has invited you to join them in {this.state.playpenName}! Would you like to join this playpen?</p>
                    <button onClick={this.handleClickYes}>Yes</button>
                    <button onClick={this.handleClickNo}>No</button> 
                </div>
                : null
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inPlaypen: state.playpenStatus
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        setPlaypen(bool) {
            dispatch(setPlaypenStatus(bool))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitation)