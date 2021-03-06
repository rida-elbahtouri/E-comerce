import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Form,Card,Button,Container,Alert} from 'react-bootstrap'
import RestApi from '../../Api/RestApi' 
import {getToken} from '../../Actions'
import { Redirect } from 'react-router-dom'
class Login extends Component {
    state={emil:"",
    password:"",
    passwordError:"",
    emailError:""
}
componentWillMount(){
    if(localStorage.getItem('token')){
        
        getToken(localStorage.getItem('token'))
    }
}
    handelChanges=(event)=>{
        const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    })
    }
    validate=()=>{
        let emailError=""
        let passwordError=""
      if(!this.state.email){
        emailError="please write your email"
      }else if(!this.state.email.includes('@')){
          emailError="email not valid"
      } 
      if(!this.state.password){
        passwordError="password requier "
      }
      if (emailError||passwordError){
          this.setState({
              emailError,passwordError
          })
          return false
      }
      return true
    }
    EmailError(){
        if(this.state.emailError){
            return <Alert variant="danger">{this.state.emailError}</Alert> 
        }
    }
    passwordError(){
        if(this.state.passwordError){
            return <Alert variant="danger">{this.state.passwordError}</Alert> 
        }
    }
    TokenCheck(){
        if(this.props.token){
            return (<Redirect to="/Home" />)
        }
    }
    hundelSubmit=(e)=>{
        e.preventDefault();
        const isValid=this.validate()
        if(isValid){
            RestApi.post('profilelogin', {
                username:this.state.email,
                password:this.state.password,
              })
              .then((response)=> {
                const Auth=response.data.token
                console.log(response)
                this.props.getToken(Auth)
                const userId=response.data.id
                const userData={
                    token:Auth,id:userId
                }
                this.props.getToken(userData)
                localStorage.setItem('token',Auth)
                localStorage.setItem('id',userId)
              })
              .catch((error)=> {
                this.setState({emailError:error.response.data.non_field_errors})
              });
          }   
}
    render() {
        console.log(this.props)
        return (
            <Container style={{'marginTop':'150px','marginLeft':'25px'}}>
            <Card border="success" style={{'padding':'8px','width':'90vw'}}>
             {this.TokenCheck()}
            <Form onSubmit={this.hundelSubmit}>
                 <Form.Group style={{'width':'85vw'}} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="emal" name="email"   placeholder="Enter email" onChange={this.handelChanges} />
                    {this.EmailError()}
                </Form.Group>
                <Form.Group style={{'width':'85vw'}} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handelChanges} />
                    {this.passwordError()}
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Login
                </Button>
            </Form>
            </Card>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return {token:state.Token.token,
    id:state.Token.id}
    }
export default connect(mapStateToProps,{getToken})(Login)