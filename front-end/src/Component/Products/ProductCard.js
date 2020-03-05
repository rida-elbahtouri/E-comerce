import React from 'react'
import {MDBIcon,MDBCardFooter,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText} from 'mdbreact';
import {Link} from 'react-router-dom'



const ProductCard=(props)=>{
    return (
        <div>
                <Link to={`/product/${props.product.id}`}>
                <MDBCard className="m-2" style={{ width: "22rem" }} cascade ecommerce wide>
      <MDBCardImage cascade top src={props.product.image} waves />
      <MDBCardBody cascade className="text-center">
        <MDBCardTitle tag="h5">
        {props.product.product_type}
        </MDBCardTitle>
        <MDBCardTitle>
          <strong>{props.product.name}</strong>
        </MDBCardTitle>
        <MDBIcon style={props.product.avrgRating >0 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={props.product.avrgRating >1 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={props.product.avrgRating >2 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={props.product.avrgRating >3 ? {'color':'orange'}:{'color':'black'} } icon="star" />
                    <MDBIcon style={props.product.avrgRating >4 ? {'color':'orange'}:{'color':'black'} } icon="star" /> ({props.product.NomberOfRating})
        <MDBCardText>
        {props.product.short_desc}...
       </MDBCardText>
        <MDBCardFooter style={{'height':'40px'}}>
          <span className="float-left">{props.product.prix}$</span>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
</Link>
        </div>
    )
}
export default ProductCard;