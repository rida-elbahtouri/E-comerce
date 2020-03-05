import React, { Component } from 'react'
import {Media} from 'react-bootstrap'
import RestApi from '../../Api/RestApi'
 
class CommentCard extends Component {
    state={user:{}}
    componentDidMount=()=>{
        RestApi.get(`/profileprofiles/${this.props.comments.user_profile}`)
        .then(response=>{
            this.setState({user:response.data})
        }).catch(error=>{
            console.log(error)
 
        })
    }
    render() {
        return (
            <Media as="li">
            <Media.Body>
                <h5>{this.state.user.first_name}</h5>
                <p>
           {this.props.comments.comments}
                </p>
            </Media.Body>
            </Media>
        )
    }
}
export default CommentCard