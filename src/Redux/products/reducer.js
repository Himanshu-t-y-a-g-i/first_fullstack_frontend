import { DELETEPRODUCT_SUCCESS, GETPRODUCT_SUCCESS, POSTPRODUCT_SUCCESS, PRODUCT_REQUEST, REQUEST_FAIL, UPDATEPRODUCT_SUCCESS } from "./actionTypes";

const initState = {
    products: [],
    response: {},
    isLoading: false,
    isError: false
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PRODUCT_REQUEST:
            return { ...state, isLoading: true, isError: false, response: {}, products: [] }
        case REQUEST_FAIL:
            console.log(payload)
            return { ...state, isLoading: false, isError: true, response: payload }
        case GETPRODUCT_SUCCESS:
            console.log(payload)
            return { ...state, isLoading: false, isError: false, products: payload.msg || payload.response.msg, response: payload }
        case POSTPRODUCT_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: payload }
        case UPDATEPRODUCT_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: payload }
        case DELETEPRODUCT_SUCCESS:
            return { ...state, isLoading: false, isError: false, response: payload }
        default:
            return state;
    }
}