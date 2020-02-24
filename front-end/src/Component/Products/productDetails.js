import React, { Component } from 'react'
import {Container,Row,Col,Image,Card,Button} from 'react-bootstrap'
import RestApi from '../../Api/RestApi'
import {connect} from 'react-redux'
import {getToken} from '../../Actions'
import {Link} from 'react-router-dom'
class ProductDetails extends Component {
    state={product:{}}
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
    renderHelper(){
        if(this.state.product.name){
            return (
                <Row>
                    <Col sm={3}>
                    <h1>{this.state.product.name}</h1>
                    <Image src={this.state.product.image} fluid/>
                    </Col>
                    <Col sm={5}>
                       <h3>discrption</h3> 
                        <p>{this.state.product.description}</p> </Col>
                    <Col sm={3}>
                    <Card border="secondary">
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Prix : {this.state.product.prix} $ </Card.Subtitle>
                            <Button variant="primary">add to Card</Button>
                            <Button  variant="primary">By now</Button>
                        </Card.Body>
                        </Card>
                    
                    </Col>
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
        console.log(this.props.user)
        return (
            <Container>
              {this.renderHelper()}
              {this.checkOwner()}
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
 return ({
     user:state.Token.id
 })
}
export default connect(mapStateToProps,{getToken})(ProductDetails)