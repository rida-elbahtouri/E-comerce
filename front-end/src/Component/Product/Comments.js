import React, { Component } from 'react'
import {Container,Form,Button,Alert} from 'react-bootstrap'
import axios from 'axios'
import CommentCard from './CommentCard'
import Ratings from './Ratings'

class Comments extends Component {
    state={comment:[],Comment_post:"",Error:"",msg:""}
    componentDidMount=()=>{
        axios({
            method: 'get',
                url: `http://127.0.0.1:8000/productcomments/`,
                params: {
                    ID: this.props.id
                  },
              })
              .then((response)=> {
               this.setState({comment:response.data})
              })
              .catch((error)=> {
                console.log(error)
              });
    }
    hundelComment=(e)=>{
        this.setState({Comment_post:e.target.value})
    }
    validate(){
        let Error=""
        if(!this.state.Comment_post){
            Error="please write a comment before submit"
          } 
        if(this.state.Comment_post==""){
            this.setState({Error})
            return false
        }
        return true
    }
    Error(){
        if(this.state.Error){
            return <Alert variant="warning">{this.state.Error}</Alert>
        }
        if(this.state.msg){
            return <Alert variant="success">{this.state.msg}</Alert>
        }
    }
    submit_comment=(e)=>{
        e.preventDefault();
        const isValid=this.validate()
        if(isValid){
        axios({
            method:'post',
            url:'http://127.0.0.1:8000/productcomments/',
            data:{
                comments:this.state.Comment_post,
                product:this.props.id
            },headers:{
                Authorization:"token "+this.props.token
            }
          })
          .then((response)=> {
            this.setState({Error:""})
            this.setState({msg:"your comment has been added"})
          })
          .catch((error)=> {
            console.log(error)
            })
            
        }}
    
    CheckUser(){
        if(this.props.token){
           return ( 
               <div>
                <p>Rate the product</p>
            <Ratings userId={this.props.userId} token={this.props.token} id={this.props.id} />
                <Form onSubmit={this.submit_comment}>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control onChange={this.hundelComment}  as="textarea" rows="3" name="description" />
                </Form.Group>
                {this.Error()}
                <Button type="submit">comment</Button>
                </Form></div>
                )
                
        }
    }
    renderH(){
        const comments=this.state.comment.map(comment=>{
            return <CommentCard key={comment.id} comments={comment} />
        })
        return comments
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
          
            <div className="comment"> 
             <Container>
            <ul className="list-unstyled">
            {this.CheckUser()}
            {this.renderH()}
            </ul>
             </Container> 
             </div>
          
            )
    }
}
export default Comments