import React, { Component } from 'react'
import {Form,Button,Container,Col,Row,Alert,Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getToken} from '../../Actions'
import axios from 'axios'
import RestApi from '../../Api/RestApi'
import { Redirect } from 'react-router-dom'
class EditProduct extends Component {
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
        product:{},
        updated:false
    }
    componentDidMount=async()=>{
        await RestApi.get(`productproduct/${this.props.match.params.prId}/`).then(response=>{
            console.log(response)
            this.setState({product:response.data,
                name:response.data.name,
                description:response.data.description,
                prix:response.data.prix,
                product_type:response.data.product_type,
            })
        }).catch(error=>{
            console.log(error)
        })
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
        typeError="please write your product type"
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
    handelImag=e=>{
       this.setState({ image:e.target.files[0]})
    }
    hundelSubmit=(e)=>{
        e.preventDefault();
        const isValid=this.validate()
        let formData=new FormData()
        formData.append('image',this.state.image)
        formData.append('name',this.state.name)
        formData.append('prix', this.state.prix)
        formData.append('description' ,this.state.description)
        formData.append('product_type',this.state.product_type)
        if(isValid){
            axios({
                method: 'put',
                url: `http://127.0.0.1:8000/productproduct/${this.props.match.params.prId}/`,
                data: formData
                ,headers:{
                    Authorization:"token "+this.props.token
                }
              })
              .then((response)=> {
               console.log(response)
               this.setState({updated:true})
              })
              .catch((error)=> {
                console.log(error)
              });
          }
    }
Checkupdate(){
    if(this.state.updated){
        return (<Redirect to={`/product/${this.props.match.params.prId}`}/>)
    }
}
    render() {
        console.log(this.state.product)
        return (
            <Container>
            {this.Checkupdate()}
            <Form onSubmit={this.hundelSubmit}>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control onChange={this.handelImag}  type="file" name="image" accept="image/*" />
               {this.imageError()} 
               </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control onChange={this.handelChanges}  value={this.state.name} type="text" name="name" />
                    {this.nameError()} 
                </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.handelChanges} value={this.state.description} as="textarea" rows="3" name="description" />
                    { this.descriptionError()}
                </Form.Group>
                <Form.Group controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={this.handelChanges} value={this.state.type} name="product_type" as="select" value={this.state.product_type}>
                    <option>books</option>
                    <option>clothing</option>
                    <option>Electronic</option>
                    <option>Games</option>
                </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prix</Form.Label>
                    <Form.Control onChange={this.handelChanges} value={this.state.prix} type="number" name="prix" />
                    {this.prixError()} 
                </Form.Group>
                <Button variant="primary" type="submit">
                Save
                </Button>
            </Form>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return {token:state.Token.token}
}
export default connect(mapStateToProps,{getToken})(EditProduct)