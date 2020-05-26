import RestApi from '../Api/RestApi'

export const getProducts=()=>{
    //get all the products from Api
    return async (dispatch)=>{
        const res=await RestApi.get('productproduct/')
        dispatch({type:'Products',payload:res.data})
    }
}

export const getToken=(Auth)=>{
    //get the token
    return ({
        type:'token',
        payload:Auth
    }
    )
}

export const getproduct=(pr)=>{
    return({
        type:'product',
        payload:pr
    })
}
export const getSearch=(keywords)=>{
    return({
        type:'search',
        payload:keywords
    })
}
export const getTotal=(price)=>{
    //get the total price of the products in the basket
    return ({
        type:'price',
        payload:price
    })
}