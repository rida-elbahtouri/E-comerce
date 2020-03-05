import {combineReducers} from 'redux'

const ProductReducer=(state=[],action)=>{
    switch (action.type){
        case 'Products':
            return action.payload
        default:
            return state
    }
}
const TokenReducer=(state={},action)=>{
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
    switch (action.type){
        case 'price':
            return state+action.payload
        default:
            return state
    }
}
export default combineReducers({
    PRODUCTS:ProductReducer,
    Token:TokenReducer,
    product:ProductRed,
    Total:TotalPrice
})