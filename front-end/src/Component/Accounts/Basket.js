import React, { Component } from 'react'
import axios from 'axios'
import {getToken} from '../../Actions'
import {connect} from 'react-redux'
import ShowCard from './ShowCard'
import Checkout from './Checkout'
 class Basket extends Component {
    state={products:[],msg:""}
    componentDidMount(){
        //get all the products in the user basket
    axios({
        method: 'get',
        url: `http://127.0.0.1:8000/productbasket/`,
        headers:{
            Authorization:"token "+this.props.token
        }
      })
      .then((response)=> {
          const basket=response.data
       console.log(basket)
       this.setState({products:basket})
      })
      .catch((error)=> {
        console.log(error.response)
      });
    }
    RenderHelper(){
        //take the basket products and display then in a nice card
        const basket= this.state.products.map((product)=>{

                return <ShowCard al={product.id}  product={product.products} key={product.id} />
                })
            return basket
    }
    check_is_total(){
        //check if the total exist(from the Api)
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