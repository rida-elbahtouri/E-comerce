import React, { Component } from 'react'
import axios from 'axios'
import {CardGroup} from 'react-bootstrap'
import ProductCard from './ProductCard'
class SearchResult extends Component {
    state={products:[]}
    componentDidMount=()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:8000/productproduct/?search=race',
        }).then((response)=> {
            console.log(response.data)
            this.setState({products:response.data})
           })
           .catch((error)=> {
             console.log(error)
           });
    }
    // renderH(){
    //     const Product=this.state.products.map((product,i)=>{
    //       return <ProductCard  product={product} key={i} />
    //     })
    //     return Product
    // }
    render() {
        console.log(this.props)
        return (
        //     <CardGroup style={{'marginLeft':'5vw'}}>
        //   {this.renderH()}
        //   </CardGroup>
        <h1>hi</h1>
        )
    }
}
export default SearchResult;