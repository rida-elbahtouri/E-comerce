import RestApi from '../Api/RestApi'

export const getProducts=()=>{
    return async (dispatch)=>{
        const res=await RestApi.get('productproduct/')
        dispatch({type:'Products',payload:res.data})
    }
}

export const getToken=(Auth)=>{
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
    return ({
        type:'price',
        payload:price
    })
}