import React, { Component } from 'react'
import {Container,Form,Row,Col,Image,Card,Button} from 'react-bootstrap'
import RestApi from '../../Api/RestApi'
import {connect} from 'react-redux'
import {getToken} from '../../Actions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {MDBIcon} from 'mdbreact'
import Comments from '../Product/Comments'
import Ratings from '../Product/Ratings'
class ProductDetails extends Component {
    state={product:{},is_added:'add to card'}
    componentDidMount(){
        console.log(this.props.match.params.prId)
        
        RestApi.get(`productproduct/${this.props.match.params.prId}/`).then(response=>{
            this.setState({product:response.data})
        }).catch(error=>{
            console.log(error)
        })

        if(localStorage.getItem('token')){
            const userData={
                token:localStorage.getItem('token'),
                id:localStorage.getItem('id')
            }
            this.props.getToken(userData)
        }
    }
    checkOwner(){
        if(this.props.user==this.state.product.user_profile){
            return <Link to={`/edit/product/${this.state.product.id}`} ><h1>edit</h1></Link> 
        }
    }
    addToCard=()=>{
        axios({
            method:'post',

            url: 'http://127.0.0.1:8000/productbasket/',
            data: {
                products:this.props.match.params.prId
            }
            ,headers:{
                Authorization:"token "+this.props.token
            }
          })
          .then((response)=> {
            this.setState({is_added:'added'})
            console.log(response.data)
          })
          .catch((error)=> {
            if(error.response){
                if(error.response.data.detail=="Invalid token header. No credentials provided."){
                    this.setState({Login:false})
                }
            }
            
          });
      
    }
    
    renderHelper(){
        if(this.state.product.name){
            return (
                <Row>
                    <Col sm={4}>
                    <h1>{this.state.product.name}</h1>
                    <Image src={this.state.product.image} fluid/>
                    <MDBIcon style={this.state.product.avrgRating >0 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={this.state.product.avrgRating >1 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={this.state.product.avrgRating >2 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={this.state.product.avrgRating >3 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={this.state.product.avrgRating >4 ? {'color':'orange'}:{'color':'black'} } icon="star" /> ({this.state.product.NomberOfRating})
                    </Col>
                    <Col sm={4}>
                       <h3>discrption</h3> 
                        <p>{this.state.product.description}</p> </Col>
                    <Col sm={4}>
                    <Card border="secondary">
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Prix : {this.state.product.prix} $ </Card.Subtitle>
                            <Button onClick={this.addToCard} variant="primary">{this.state.is_added}</Button>
                            <Button  variant="primary">By now</Button>
                        </Card.Body>
                        </Card>
                    
                    </Col>
                    <Comments userId={this.props.user} token={this.props.token} id={this.props.match.params.prId} />
                </Row>
            
            
            )
        }else{
            return (
                <div>
                L
                </div>
            )
        }
    }
    render() {
        console.log(this.state.product)
        console.log(this.props)
        return (
            <Container>
               {this.checkOwner()}
               {this.renderHelper()}
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
 return ({
     user:state.Token.id,
     token:state.Token.token
     
 })
}
export default connect(mapStateToProps,{getToken})(ProductDetails)