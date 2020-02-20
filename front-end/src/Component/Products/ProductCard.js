import React from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
const ProductCard=(props)=>{
    return (
        <div>
       
            <MDBCol>
                <MDBCard style={{ width: "22rem" }}>
                    <MDBCardImage className="img-fluid" src={props.product.image} waves />
                    <MDBCardBody>
                    <MDBCardTitle>{props.product.name}</MDBCardTitle>
                    <MDBCardText>
                    {props.product.description}
                    </MDBCardText>
                    <MDBBtn href="#">{props.product.prix}</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
 
        </div>
    )
}

export default ProductCard