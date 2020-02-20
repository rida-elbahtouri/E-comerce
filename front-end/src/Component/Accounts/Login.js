import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Form,Button,Container,Alert} from 'react-bootstrap'
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
        if(this.props.token!==""){
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
                this.props.getToken(Auth)
                localStorage.setItem('token',Auth)
              })
              .catch((error)=> {
                this.setState({emailError:error.response.data.non_field_errors})
              });
          }   
}
    render() {
        console.log(localStorage.getItem('token'))
        return (
            <Container>
             {this.TokenCheck()}
            <Form onSubmit={this.hundelSubmit}>
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="emal" name="email"   placeholder="Enter email" onChange={this.handelChanges} />
                    {this.EmailError()}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handelChanges} />
                    {this.passwordError()}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        token:state.Token
    }
}
export default connect(mapStateToProps,{getToken})(Login)