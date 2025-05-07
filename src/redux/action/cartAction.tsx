import callApi from '../../helper/api';
import {ADD_TO_CART, UPDATE_CART, REMOVE_CART, CLEAR_CART, SET_LOADING, GET_SIMILAR_PRODUCT_LIST} from '../constants/cartConstant';


export const addToCart = (pd:any) => ({
    type : ADD_TO_CART,
    payload : pd
})

export const updateCart = (data:any) => ({
    type : UPDATE_CART,
    payload : data
})

export const removeCart = (data:any) => ({
    type : REMOVE_CART,
    payload : data
})

export const clearCart = () => ({
    type : CLEAR_CART
})

export const setLoading = () => ({
    type : SET_LOADING
})

export const similarProductList = () => {

    return (dispatch:any) => {
        try {
            setTimeout(async () => {
                const response = await callApi('GET', '/data.json');
                const data = response.data.data.product;
                dispatch({type : GET_SIMILAR_PRODUCT_LIST, payload : data})
                dispatch({ type : SET_LOADING });
            }, 1000);
        } catch (error) {
            console.error(error);
            dispatch({ type : SET_LOADING });
        }
    }
}
