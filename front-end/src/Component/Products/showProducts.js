import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../../Actions'
import ProductCard from './ProductCard'
class ShowProducts extends React.Component{
    componentDidMount(){
        this.props.getProducts()
    }
    renderH(){
        const Product=this.props.products.map((product,i)=>{
          return <ProductCard product={product} key={i} />
        })
        return Product
    }
    render(){
        console.log(this.props)
        return (
            <div>
                here products
                {this.renderH()}
            </div>
        )
    }

}
const mapStateToPros=(state)=>{
    return{
        products:state.PRODUCTS 
    }
}
export default connect(mapStateToPros,{getProducts})(ShowProducts);