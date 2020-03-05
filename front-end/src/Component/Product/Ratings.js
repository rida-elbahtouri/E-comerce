import React, { Component } from 'react'
import axios from 'axios'
import {MDBIcon,MDBBtn} from 'mdbreact'
import { Alert } from 'react-bootstrap'
export default class Ratings extends Component {
    state={starcolor1:"",
    starcolor2:"",
    starcolor3:"",
    starcolor4:"",
    starcolor5:"",
    rating:0,msg:"",
    is_rate:false,ratingId:"",
    userrating:0}
     componentDidMount=()=>{
         axios({
             method:'get',
             url: `http://127.0.0.1:8000/productrating/`,
             params: {
                 ID: this.props.id
               },
           })
           .then((response)=> {
            console.log(response.data)
            const is_userrate=response.data.filter(rating=>{
                return rating.user_profile==this.props.userId
            })
            console.log(is_userrate)
            if(is_userrate){
                this.setState({is_rate:true,
                userrating:is_userrate[0].rating,ratingId:is_userrate[0].id})
            };
            
            
           })
           .catch((error)=> {
             console.log(error)
           });
     }
   rate=(e)=>{
       
       console.log(e.target.id)
       if(e.target.id=="star5"){
        this.setState({
            rating:5, starcolor1:"star",
    starcolor2:"star",
    starcolor3:"star",
    starcolor4:"star",
    starcolor5:"star"
        })
       }
       if(e.target.id=="star4"){
        this.setState({
            rating:4,starcolor1:"star",
    starcolor2:"star",
    starcolor3:"star",
    starcolor4:"star",
    starcolor5:""
        })
       }
       if(e.target.id=="star3"){
        this.setState({
            rating:3,starcolor1:"star",
    starcolor2:"star",
    starcolor3:"star",
    starcolor4:"",
    starcolor5:""
        })
       }
       if(e.target.id=="star2"){
        this.setState({
            rating:2,starcolor1:"star",
    starcolor2:"star",
    starcolor3:"",
    starcolor4:"",
    starcolor5:""
        })
       }
       if(e.target.id=="star1"){
        this.setState({
    starcolor1:"star",
    starcolor2:"",
    starcolor3:"",
    starcolor4:"",
    starcolor5:"", rating:1,
        })
       }
   }
   submitratings=()=>{
   
    if(this.state.userrating===0){
        axios({
        method:'post',
            url:'http://127.0.0.1:8000/productrating/',
            data:{
                rating:this.state.rating,
                product:this.props.id
            },headers:{
                Authorization:"token "+this.props.token
            }
    }).then((response)=> {
        this.setState({msg:"your rating has been added"})
      })
      .catch((error)=> {
        console.log(error.response)
        })
}else{
    axios({
        method:'put',
            url:`http://127.0.0.1:8000/productrating/${this.state.ratingId}/`,
            data:{
                rating:this.state.rating,
                product:this.props.id
            },headers:{
                Authorization:"token "+this.props.token
            }
    }).then((response)=> {
        console.log(response)
        this.setState({msg:"your rating has been added"})
      })
      .catch((error)=> {
        console.log(error.response)
        })
}
   }
   edit_rating=()=>{
    this.setState({is_rate:false})
   }
   rating_submit_succses=()=>{
       if(this.state.msg){
       return <Alert variant='success'>{this.state.msg}</Alert>
    }
   }
   checkRate=()=>{
   if(this.state.is_rate){
    return (    <div>
               <MDBIcon   style={this.state.userrating >0 ? {'color':'yellow'}:{'color':'black'} }  icon="star" size="2x"/>
               <MDBIcon   style={this.state.userrating >1 ? {'color':'yellow'}:{'color':'black'} }  icon="star" size="2x"/>
               <MDBIcon   style={this.state.userrating >2 ? {'color':'yellow'}:{'color':'black'} }  icon="star" size="2x"/>
               <MDBIcon   style={this.state.userrating >3 ? {'color':'yellow'}:{'color':'black'} }  icon="star" size="2x"/>
               <MDBIcon   style={this.state.userrating >4 ? {'color':'yellow'}:{'color':'black'} }  icon="star" size="2x"/>
                <MDBBtn onClick={this.edit_rating}>edit</MDBBtn>
                </div>)
   }else{
       return(
    <div>
    <MDBIcon onClick={this.submitratings} onMouseOver={this.rate} className={this.state.starcolor1} id="star1" icon="star" size="2x"/>
    <MDBIcon onClick={this.submitratings} onMouseOver={this.rate} className={this.state.starcolor2} id="star2" icon="star" size="2x"/>
    <MDBIcon onClick={this.submitratings} onMouseOver={this.rate} className={this.state.starcolor3} id="star3" icon="star" size="2x"/>
    <MDBIcon onClick={this.submitratings} onMouseOver={this.rate} className={this.state.starcolor4} id="star4" icon="star" size="2x"/>
    <MDBIcon onClick={this.submitratings} onMouseOver={this.rate} className={this.state.starcolor5} id="star5" icon="star" size="2x"/>
        {this.rating_submit_succses()}
 </div>)
   }
}
    render() {
        console.log(this.state)
        return (
           this.checkRate()
        )
    }
}
