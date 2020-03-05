import React, { Component } from 'react'
import {Container,Row,Col,Image,Button} from 'react-bootstrap'
import img from '../Products/anime.jpg'
import RestApi from '../../Api/RestApi'
import {connect} from 'react-redux'
import {getToken} from '../../Actions'
import {Link} from 'react-router-dom'
class Profile extends Component {
    state={profile:{}}
    componentDidMount(){
        RestApi.get(`profileprofiles/${this.props.match.params.userId}/`).then(response=>{
            this.setState({profile:response.data})
            console.log(response.data)
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
    Checkowner(){
        if(this.props.match.params.userId==this.props.id){
            return (
                <div>
                    <p>email : {this.state.profile.email}</p>
                        <p>adress : {this.state.profile.adress}</p>
                        <p>Zip : {this.state.profile.Postal_code}</p>
                </div>
            )
        }
    }
    EDITbutton(){
        if(this.props.match.params.userId==this.props.id){
            return (
               <Link to={`/edit/user/${this.props.user}`} >
                   <Button size="sm" variant="light">Edit</Button>
               </Link>
            )
        }
    }
    render() {
        console.log(this.props.match.params.userId)
        console.log(this.props)
        return (
            <Container>
                <Row>
                <Col sm={1.5}>
                     {this.EDITbutton()}
                </Col>
                    <Col className="profile" sm={3}>
                        <Image className="img" src={img} fluid />
                        
                        <p>name: {this.state.profile.first_name} {this.state.profile.last_name}</p>
                        {this.Checkowner()}
                       
                    </Col>
                    <Col>
                        Coments
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps=(state)=>{
    return {token:state.Token.token,
    id:state.Token.id}
    }
   export default connect(mapStateToProps,{getToken})(Profile);