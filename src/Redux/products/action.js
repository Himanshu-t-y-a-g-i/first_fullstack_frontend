import axios from "axios"

const { PRODUCT_REQUEST, REQUEST_FAIL, GETPRODUCT_SUCCESS, POSTPRODUCT_SUCCESS, UPDATEPRODUCT_SUCCESS, DELETEPRODUCT_SUCCESS } = require("./actionTypes")

export const productRequest = () => {
    return { type: PRODUCT_REQUEST };
}

export const requestFail = (payload) => {
    return { type: REQUEST_FAIL, payload };
}

export const getProduct = (payload) => {
    return { type: GETPRODUCT_SUCCESS, payload };
}

export const postProduct = (payload) => {
    return { type: POSTPRODUCT_SUCCESS, payload };
}

export const updateProduct = (payload) => {
    return { type: UPDATEPRODUCT_SUCCESS, payload };
}

export const deleteProduct = (payload) => {
    return { type: DELETEPRODUCT_SUCCESS, payload };
}

// DB operations

export const getProductAct = (page) => (dispatch) => {
    dispatch(productRequest());
    axios.get(`${process.env.REACT_APP_URL_API}?limit=16&page=${page}`).then(res => {
        dispatch(getProduct(res.data));
    }).catch(e => {
        dispatch(requestFail(e.response.data || e.message));
    })
}

export const getSingleProd = (token, id, setNewData) => (dispatch) => {
    dispatch(productRequest());
    axios.get(`${process.env.REACT_APP_URL_API}/${id}`, {
        headers: { token }
    }).then(res => {
        setNewData(res.data.msg)
        dispatch(getProduct([res.data]));
    }).catch(e => {
        dispatch(requestFail(e.response.data || e.message));
    })
}

export const postProductAct = (token, payload, setStatus) => (dispatch) => {
    dispatch(productRequest());
    axios.post(`${process.env.REACT_APP_URL_API}/add`, payload, {
        headers: { token }
    }).then(res => {
        console.log(res.data)
        dispatch(postProduct(res.data));
        setStatus(true);
    }).catch(e => {
        dispatch(requestFail(e.response.data || e.message));
    })
}

export const updateProductAct = (token, payload, id) => (dispatch) => {
    dispatch(productRequest());
    axios.patch(`${process.env.REACT_APP_URL_API}/${id}`, payload, {
        headers: { token }
    }).then(res => {
        dispatch(updateProduct(res.data));
    }).catch(e => {
        dispatch(requestFail(e.response.data || e.message));
    })
}

export const deleteProductAct = (token, id) => dispatch => {
    dispatch(productRequest());
    axios.delete(`${process.env.REACT_APP_URL_API}/${id}`, {
        headers: { token }
    }).then(res => {
        dispatch(deleteProduct(res.data));
        dispatch(getProductAct());
    }).catch(e => {
        dispatch(requestFail(e.response.data || e.message));
    })
}