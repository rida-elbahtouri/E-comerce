import {combineReducers} from 'redux'

const ProductReducer=(state=[],action)=>{
    //state of all products from Api
    switch (action.type){
        case 'Products':
            return action.payload
        default:
            return state
    }
}
const TokenReducer=(state={},action)=>{
    //Token and id from user auth
    switch (action.type){
        case 'token':
            return action.payload
        default:
            return state
    }
}
const ProductRed=(state={},action)=>{
    switch (action.type){
        case 'product':
            return action.payload
        default:
            return state
    }
}
const TotalPrice=(state=0,action)=>{
    //price reducer
    switch (action.type){
        case 'price':
            return state+action.payload
        default:
            return state
    }
}
const SearchReducer=(state='',action)=>{
    switch (action.type){
        case 'search':
            return action.payload
        default:
            return state
    }
}
export default combineReducers({
    PRODUCTS:ProductReducer,
    Token:TokenReducer,
    product:ProductRed,
    Total:TotalPrice,
    search:SearchReducer,
})