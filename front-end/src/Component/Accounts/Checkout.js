import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'

const stripeCheckOutButton=({price})=>{
    const state={
        loading:false,
        error:null,
        success:false
    }
    const stripePrice=price*100
    const publishKey='pk_test_PtNCbQeVEuvs8pyEy61myvvY00WbvEx2F7'
    const onToken=token=>{
        state.loading=true
        console.log(token)
        Axios({
            method:'post',
            url:'http://127.0.0.1:8000/product/Payment/',
            data:{
                source:token.id,
                amount:stripePrice
            },headers:{
                Authorization:"token a04f0d4412b4f576082792c51e84904b2a1a953c"
            }

        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err.response.data)
        })
    }
    return(
        <StripeCheckout
        label='Pay now'
        name='AllStore'
        shippingAddress
        billingAddress
        amount={stripePrice}
        description={`your total is ${price}` }
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        token={onToken}
        stripeKey={publishKey}
         />
    )
}
export default stripeCheckOutButton;