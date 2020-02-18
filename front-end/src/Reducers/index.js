import {combineReducers} from 'redux'

const ProductReducer=(state=[],action)=>{
    switch (action.type){
        case 'Products':
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    PRODUCTS:ProductReducer
})