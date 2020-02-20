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
