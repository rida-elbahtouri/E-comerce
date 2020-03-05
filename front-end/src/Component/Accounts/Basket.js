import React, { Component } from 'react'
import axios from 'axios'
import {getToken} from '../../Actions'
import {connect} from 'react-redux'
import ShowCard from './ShowCard'
import Checkout from './Checkout'
import { Alert } from 'react-bootstrap'
 class Basket extends Component {
    state={products:[],msg:""}
    componentDidMount(){
    axios({
        method: 'get',
        url: `http://127.0.0.1:8000/productbasket/`,
        headers:{
            Authorization:"token "+this.props.token
        }
      })
      .then((response)=> {
          const basket=response.data
          const userBasket=basket.filter((product)=>{
              return product.user_profile==this.props.id
          })
       console.log(userBasket)
       console.log(basket)
       this.setState({products:userBasket})
      })
      .catch((error)=> {
        console.log(error.response.data)
        this.setState({msg:error.response.data})
      });
    }
    RenderHelper(){
        if(!this.state.msg.msg){
        const basket= this.state.products.map((product)=>{

                return <ShowCard al={product.id}  product={product.products} key={product.id} />
                })
            return basket
    }else{
        return <Alert variant="success" >your payment success</Alert>
    }}
    check_is_total(){
        if(this.state.products[0]){
            return <Checkout price={this.state.products[0].getTotal} />
        }
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
           
           {this.RenderHelper()}
           <div className="card-pay">
           <h1>total : {this.props.total} $</h1>
           <div className='pay-button'>
            {this.check_is_total()}</div>
            </div></div>
        )
    }
}
const mapPropsToState=(state)=>{
    return {token:state.Token.token,
    id:state.Token.id,
    total:state.Total}
    }
    export default connect(mapPropsToState,{getToken})(Basket)