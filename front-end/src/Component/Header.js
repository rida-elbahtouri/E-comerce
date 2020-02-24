import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBIcon
} from "mdbreact";
import { BrowserRouter as Router ,Switch,Route,Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./Accounts/Login";
import CreateAccount from './Accounts/CreateAccount';
import CreateProduct from '../Component/Product/CreateProduct'
import ShowProducts from '../Component/Products/showProducts'
import {getToken} from '../Actions'
import ProductDetails from './Products/productDetails';
import EditProduct from './Product/EditProduct';
import logo from './logo.png'
class NavbarPage extends Component {
state = {
  isOpen: false
};
componentWillMount(){
  if(localStorage.getItem('token')){
      this.props.getToken(localStorage.getItem('token'))
  }
}
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
LogOut=()=>{
  localStorage.setItem('token',"")
  localStorage.setItem('id',"")
  this.props.getToken(localStorage.getItem('token'))
}
checkLogin(){
  let token =this.props.token
  if (token ===""){
    return (
      <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">
                  <Link to="/Login">Login</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                  <Link to="/CreateAccount">SinghUp</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
    )
  }else{
    return(
      <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">
                  <Link to="/Login">Your basket</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                  <Link to="/CreateProduct">Create Product</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.LogOut} href="#!">
                  <Link to="/Home">Logout</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
    )
  }
}
render() {
  console.log(this.props)
  return (
    <Router>
      <MDBNavbar color="stylish-color" style={{"marginBottom":"20px"}} dark expand="md">
        <MDBNavbarBrand>
        <img style={{'width':"34px"}} src={logo} alt="logo" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">best Deals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">sell with us</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">CATEGORY</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">
                  <Link to="pr">
                  books</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">clothing</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Elicronic</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Games</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                {this.checkLogin()}
              </MDBDropdown>
              
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/CreateAccount">
            <CreateAccount />
          </Route>
          <Route path="/CreateProduct">
            <CreateProduct />
          </Route>
          <Route path="/Home">
            <ShowProducts />
          </Route>
          <Route path="/product/:prId" component={ProductDetails}/>
          <Route path="/edit/product/:prId" component={EditProduct}/>
        </Switch>
        
    </Router>
    );
  }
}
const mapStateToProps=(state)=>{
  return {token:state.Token}
}
export default connect(mapStateToProps,{getToken})(NavbarPage);