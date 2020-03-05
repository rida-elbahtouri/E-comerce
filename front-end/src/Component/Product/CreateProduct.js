import React, { Component } from 'react'
import {Form,Button,Container,Col,Row,Alert,Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getToken} from '../../Actions'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
class CreateProduct extends Component {
    state={
        image:null,
        name:"",
        description:"",
        prix:"",
        product_type:"",
        imageError:"",
        nameError:"",
        descriptionError:"",
        prixError:"",
        typeError:"",
        Login:null,
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
        let nameError=""
        let prixError=""
        let imageError=""
        let descriptionError=""
        let typeError=""
      if(!this.state.product_type){
        typeError="please choose your product type"
      } 
      if (!this.state.prix){
        prixError="you can't leave it blank"
      }
      if (!this.state.description){
        descriptionError="you can't leave it blank"
      }
      if(!this.state.name){
        nameError="the product name is requier "
      }
      if(!this.state.image){
        nameError="the product image is requier "
      }
      if (typeError||nameError||descriptionError||prixError||imageError){
          this.setState({
            typeError,nameError,descriptionError,prixError,imageError
          })
          return false
      }
      return true
    }
    nameError(){
        if(this.state.nameError){
            return <Alert variant="danger">{this.state.nameError}</Alert> 
        }
    }
    descriptionError(){
        if(this.state.descriptionError){
            return <Alert variant="danger">{this.state.descriptionError}</Alert> 
        }
    }
    imageError(){
        if(this.state.imageError){
            return <Alert variant="danger">{this.state.imageError}</Alert> 
        }
    }
    prixError(){
        if(this.state.prixError){
            return <Alert variant="danger">{this.state.prixError}</Alert> 
        }
    }
    typeError(){
        if(this.state.typeError){
            return <Alert variant="danger">{this.state.typeError}</Alert> 
        }
    }
    handelImag=e=>{
       this.setState({ image:e.target.files[0]})
    }
    hundelSubmit=(e)=>{
        e.preventDefault();
        const isValid=this.validate()
        let productType=""
        if(this.state.product_type==="Choose..."){
            productType="general"
        }else{
            productType=this.state.product_type
        }
        let formData=new FormData()
        formData.append('image',this.state.image)
        formData.append('name',this.state.name)
        formData.append('prix', this.state.prix)
        formData.append('description' ,this.state.description)
        formData.append('product_type',productType)
        if(isValid){
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/productproduct/',
                data: formData
                ,headers:{
                    Authorization:"token "+this.props.token
                }
              })
              .then((response)=> {
                this.setState({Login:true})
              })
              .catch((error)=> {
                if(error.response){
                    if(error.response.data.detail=="Invalid token header. No credentials provided."){
                        this.setState({Login:false})
                    }
                }
                
              });
          }
    }
    CheckLogn(){
        if (this.state.Login===false){
            return(<Redirect to="/Login" />)
        }else if(this.state.Login===true){
            return(<Redirect to="/Home" />)
        }
    }
    render() {
        return (
            <Container>
            {this.CheckLogn()}
            <Form onSubmit={this.hundelSubmit}>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control onChange={this.handelImag} type="file" name="image" accept="image/*" />
               {this.imageError()} 
               </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control onChange={this.handelChanges}  type="text" name="name" />
                    {this.nameError()} 
                </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.handelChanges} as="textarea" rows="3" name="description" />
                    { this.descriptionError()}
                </Form.Group>
                <Form.Group controlId="formGridState">
                <Form.Label>Product Type</Form.Label>
                <Form.Control onChange={this.handelChanges} name="product_type" as="select" value={this.state.product_type}>
                    <option></option>
                    <option>books</option>
                    <option>clothing</option>
                    <option>Electronic</option>
                    <option>Games</option>
                    <option>general</option>
                </Form.Control>
                {this.typeError()}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prix</Form.Label>
                    <Form.Control onChange={this.handelChanges}  type="number" name="prix" />
                    {this.prixError()} 
                </Form.Group>
                <Button variant="primary" type="submit">
                    create
                </Button>
            </Form>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return {token:state.Token.token}
}
export default connect(mapStateToProps,{getToken})(CreateProduct);