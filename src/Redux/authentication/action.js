import { AUTHREQUEST, AUTHREQUESTFAIL, LOGIN, LOGOUT, LSTOKEN, REGISTER } from "./actionTypes"
import axios from "axios"

export const authRequest = () => {
    return { type: AUTHREQUEST };
}

export const authRequestFail = (payload) => {
    return { type: AUTHREQUESTFAIL, payload }
}

export const login = (payload) => {
    return { type: LOGIN, payload };
}

export const register = (payload) => {
    return { type: REGISTER, payload };
}

export const logout = () => {
    return { type: LOGOUT }
}

export const lsToken = (payload) => {
    return { type: LSTOKEN, payload }
}

export const userLogin = (data, navigate) => (dispatch) => {
    dispatch(authRequest());
    axios.post(`${process.env.REACT_APP_AUTHURL_API}/login`, data).then(res => {
        dispatch(login(res.data));
        navigate("/");
    }).catch(e => {
        if (e.response) {
            dispatch(authRequestFail(e.response.data));
        } else {
            dispatch(authRequestFail(e.message))
        }
    })
}

export const userLogout = (navigate) => (dispatch) => {
    dispatch(authRequest());
    try {
        localStorage.setItem("loginStatus_appFS", JSON.stringify({ isAuth: false, token: "" }));
        dispatch(logout());
    } catch (e) {
        dispatch(authRequestFail(e.response.data || e.message));
    }
}

export const userRegister = (data) => (dispatch) => {
    dispatch(authRequest())
    axios.post(`${process.env.REACT_APP_AUTHURL_API}/register`, data).then(res => {
        dispatch(register(res.data));
    }).catch(e => {
        dispatch(authRequestFail(e.response.data || e.message))
    })
}

export const setLsToken = (data) => dispatch => {
    dispatch(authRequest());
    try {
        dispatch(lsToken(data));
    } catch (e) {
        dispatch(authRequestFail())
    }
}