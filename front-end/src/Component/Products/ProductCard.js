import React from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import {Link} from 'react-router-dom'



const ProductCard=(props)=>{
    return (
        <div>
            <MDBCol>
            
            <Link to={`/product/${props.product.id}`}>
                <MDBCard  style={{ width: "18rem" }}>
                    <MDBCardImage  className="img-fluid" src={props.product.image} waves />
                    <MDBCardBody>
                    <MDBCardTitle>{props.product.name}</MDBCardTitle>
                    <MDBCardText>
                    {props.product.description}
                    </MDBCardText>
                    <MDBBtn href="#">{props.product.prix}</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
                </Link>
                </MDBCol>

        </div>
    )
}
export default ProductCard;