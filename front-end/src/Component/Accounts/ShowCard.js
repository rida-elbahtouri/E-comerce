import React, { Component } from 'react'
import RestApi from '../../Api/RestApi'
import {MDBBtn} from 'mdbreact';
import axios from 'axios'
import { connect } from 'react-redux';
import {getToken,getTotal} from '../../Actions'
 class ShowCard extends Component {
    state={product:{}}
    componentDidMount(){
        RestApi.get(`productproduct/${this.props.product}/`).then(response=>{
            console.log(response.data)
            this.setState({product:response.data})
            this.props.getTotal(this.state.product.prix)
        })

        if(localStorage.getItem('token')){
            const userData={
                token:localStorage.getItem('token'),
                id:localStorage.getItem('id')
            }
            this.props.getToken(userData)
        }
    }
    RemoveItem=()=>{
        axios({
            method:'delete',
            url:`http://127.0.0.1:8000/productbasket/${this.props.al}/`,
            headers:{
                Authorization:"token "+this.props.token
            }
        }).then((response)=> {
            console.log(response)
            this.props.getTotal(0)
          })
          .catch((error)=> {
            console.log(error.response)
          })
        this.setState({product:null})
    }
    renderHelper=()=>{
        //check if ther is a product
        if(this.state.product){
            return( <div className='list_of_items'>
                <div className='item_data'>
                <img alt='roduct_image' className="product_img" src={this.state.product.image} waves />
                <h1>{this.state.product.name}</h1>
                <div className="mobile-price">
                <p>{this.state.product.prix} $</p> 
                <MDBBtn className='remove_from_card' onClick={this.RemoveItem}>remove</MDBBtn>
                </div></div>
            </div>)
        }else{
            return <p>the item had ben deleted</p>
        }
    }
    render() {
        console.log(this.state)
        console.log(this.props)
        return (
        
           this.renderHelper()
            
        )
    }
}
const mapStateToProps=(state)=>{
    return ({
        user:state.Token.id,
        token:state.Token.token,
        total:state.Total
    })
   }

export default connect(mapStateToProps,{getToken,getTotal})(ShowCard)