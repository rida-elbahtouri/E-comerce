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
import Profile from "./Accounts/Profile";
import EditProfile from "./Accounts/EditProfile";
import Basket from "./Accounts/Basket"
import GetByCatagory from "./Products/GetByCatagory";
import SearchResult from "./Products/SearchResult";
class NavbarPage extends Component {
state = {
  isOpen: false,keyword:'',url:''
};
componentWillMount(){
  if(localStorage.getItem('token')){
    //check if the is a token in the local storage
      const data={
        token:localStorage.getItem('token'),
        id:localStorage.getItem('id')
      }
      //if it is ,set the state to data
      this.props.getToken(data)
  }
}
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
LogOut=()=>{
  //when logout delete the token from  state and the local storage
  localStorage.setItem('token',"")
  localStorage.setItem('id',"")
  this.props.getToken(localStorage.getItem('token'))
}
checkLogin(){
  //change the header base on the user token
  if (!this.props.token.token){
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
                  <MDBDropdownItem href={this.state.url}>
                  My Basket
                  </MDBDropdownItem>
                  <MDBDropdownItem href={`/user/${this.props.token.id}`}>
                    my profile
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/CreateProduct">
                  Create Product
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.LogOut} href="#!">
                  <Link to="/Home">Logout</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
    )
  }
}
searchSabmit=(e)=>{
  e.preventDefault();
}
searchKey=(e)=>{
  this.setState({keyword:e.target.value})
}
checkLogin_ForBasket(){
  
  if (!this.props.token.token){
  return (
            <MDBNavItem>
            <MDBNavLink to="/CreateAccount"> 
            <MDBIcon icon="shopping-basket" />
            </MDBNavLink>
            </MDBNavItem>
  )
  }else{
    return (
      <MDBNavItem>
      <MDBNavLink to="/Mybasket"> 
      <MDBIcon icon="shopping-basket" />
      </MDBNavLink>
      </MDBNavItem>
)
  }
}
render() {
  return (
    <Router>
      <MDBNavbar color="stylish-color" style={{"marginBottom":"20px"}} dark expand="md">
        <MDBNavbarBrand>
        <Link to='/Home'>
        <img style={{'width':"34px"}} src={logo} alt="logo" /></Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">best Deals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">CATEGORY</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/products/books">
                  books
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/products/clothing">
                  clothing
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/products/Electronic">Electronic</MDBDropdownItem>
                  <MDBDropdownItem href="/products/Games">Games</MDBDropdownItem>
                  <MDBDropdownItem href="/products/general">general</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            
              <MDBFormInline onSubmit={this.searchSabmit} waves>
                <div   className="md-form my-0">
                  <input onChange={this.searchKey} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
              <MDBNavItem>
              <a href={`/search/${this.state.keyword}`}>
               <MDBIcon style={{'marginTop':'12px','marginRight':'17px','color':'white'}} icon="search" />
               </a>
               </MDBNavItem>
            {this.checkLogin_ForBasket()}
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
          <Route exact path="/user/:userId" component={Profile}/>
          <Route path="/edit/user/:userId" component={EditProfile}/>
          <Route path="/Mybasket" component={Basket}/>
          <Route path="/products/:type" component={GetByCatagory} />
          <Route exact path="/">
            <ShowProducts />
          </Route> 
          <Route path="/search/:keyword" component={SearchResult} />
        </Switch>
        
    </Router>
    );
  }
}
const mapStateToProps=(state)=>{
  return {token:state.Token}
}
export default connect(mapStateToProps,{getToken})(NavbarPage);