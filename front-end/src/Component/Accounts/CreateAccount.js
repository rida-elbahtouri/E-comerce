import React, { Component } from 'react'
import {Form,Button,Container,Col,Row,Alert} from 'react-bootstrap'
import {RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import RestApi from '../../Api/RestApi' 
import {getToken} from '../../Actions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
class CreateAccount extends Component {
    state={
            country:"",
            region:"",
            first_name: "",
            last_name:"",
            email: "",
            password1: "",
            password2: "",
            adress:"",
            zip:"",
            firstName_Error: "",
            lastName_Error:"",
            emailError: "",
            passwordError: "",
            passwordError2: "",Postal_codeError:""
        }
    CountryList=()=>{
        const list=CountryRegionData.map((country,i)=>{
            return <option key={i}>{country[0]}</option>
        })
        return list
    }
    CountryClick=(e)=>{
        return this.setState({country:e.target.value})
    }
    regionOnChange=(e)=>{
        return this.setState({region:e})
    }
    handelChanges=(event)=>{
        //set state of the target object with his value 
        const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    })
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validate=()=>{
        //check if all the fields are valid
        let emailError=""
        let firstName_Error=""
        let lastName_Error=""
        let passwordError=""
        let passwordError2=""
        let Postal_codeError=""
      if(!this.state.email){
        emailError="please write your email"
      }else if(!this.state.email.includes('@')){
          emailError="email not valid"
      } 
      if(!this.validateEmail(this.state.email)){
        emailError="email not valid"
      }
      if (!this.state.first_name){
        firstName_Error="you can't leave it blank"
      }
      if (!this.state.last_name){
        lastName_Error="you can't leave it blank"
      }
      if(!this.state.password1){
        passwordError="password requier "
      }else if (this.state.password1!==this.state.password2){
          passwordError2="password don't mutch"
      }
      if(!this.state.zip){
        Postal_codeError="enter the Zip code of your area"
      }
      if (emailError||firstName_Error||passwordError||passwordError2||lastName_Error||Postal_codeError){
          this.setState({
              emailError,firstName_Error,lastName_Error,passwordError,passwordError2,Postal_codeError
          })
          return false
      }
      return true
    }
    hundelSubmit=(e)=>{
        e.preventDefault();
        const isValid=this.validate()
        if(isValid){
            //if all fields valid make an Api request 
            RestApi.post('profileprofiles/', {
                email:this.state.email,
                password:this.state.password2,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                adress:this.state.adress,
                Postal_code:this.state.zip
              })
              .then((response)=> {
                const Auth=response.data.token
                const userId=response.data.id
                const userData={
                    token:Auth,id:userId
                }
                this.props.getToken(userData)
                localStorage.setItem('token',Auth)
                localStorage.setItem('id',userId)
              })
              .catch((error)=> {
                  console.log(error.response)
                  if (error.response){
                     this.setState({emailError:error.response.data.email}); 
                  }
                
              });
              
          }
    }
    TokenCheck(){
        if(this.props.token){
            //if the is a token return to home page
            return (<Redirect to="/Home" />)
        }
    }
    //alert errors 
    EmailError(){
        if(this.state.emailError){
            return <Alert variant="danger">{this.state.emailError}</Alert> 
        }
    }
    firstNameError(){
        if(this.state.firstName_Error){
            return <Alert variant="danger">{this.state.firstName_Error}</Alert> 
        }
    }
    lastNameError(){
        if(this.state.lastName_Error){
            return <Alert variant="danger">{this.state.lastName_Error}</Alert> 
        }
    }
    password1Error(){
        if(this.state.passwordError){
            return <Alert variant="danger">{this.state.passwordError}</Alert> 
        }
    }
    password2Error(){
        if(this.state.passwordError2){
            return <Alert variant="danger">{this.state.passwordError2}</Alert> 
        }
    }
    Postal_codeError(){
        if(this.state.Postal_codeError){
            return <Alert variant="danger">{this.state.Postal_codeError}</Alert>
    }
    }
    
    render() {
        return (
            
            <Container>
            {this.TokenCheck()}
                <Form onSubmit={this.hundelSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                        <Form.Control placeholder="First name*" name="first_name" onChange={this.handelChanges} />
                        {this.firstNameError()}
                        </Col>
                        <Col>
                        <Form.Control placeholder="Last name*" name="last_name" onChange={this.handelChanges} />
                        {this.lastNameError()}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="emal" name="email"  value={this.state.email}  placeholder="Enter email" onChange={this.handelChanges} />
                    {this.EmailError()}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" name="password1" placeholder="Password" onChange={this.handelChanges} />
                    {this.password1Error()}
                </Form.Group>
                <Form.Group controlId="Password2">
                    <Form.Label>verify Password*</Form.Label>
                    <Form.Control type="password" name="password2" placeholder="Password" onChange={this.handelChanges} />
                    {this.password2Error()}
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" name="adress" onChange={this.handelChanges} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Contry</Form.Label>
                    <Form.Control as="select" onChange={this.CountryClick}>
                        {this.CountryList()}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <RegionDropdown value={this.state.region} country={this.state.country} onChange={this.regionOnChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control name="zip" onChange={this.handelChanges} />
                    {this.Postal_codeError()}
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                   Sigh up
                </Button>
                </Form> 
                </Container>
        )
    }
}
const mapPropsToState=(state)=>{
    return {token:state.Token.token,
    id:state.Token.id}
    }
export default connect(mapPropsToState,{getToken})(CreateAccount);