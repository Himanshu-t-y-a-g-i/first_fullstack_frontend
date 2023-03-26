import { AUTHREQUEST, AUTHREQUESTFAIL, LOGIN, LOGOUT, LSTOKEN, REGISTER } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    response: {},
    token: "",
    role: ""
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case AUTHREQUEST:
            return { ...state, isLoading: true, isError: false, isAuth: false, response: "" };
        case AUTHREQUESTFAIL:
            return { ...state, isError: true, isLoading: false, response: payload };
        case LOGIN:
            console.log(payload)
            return { ...state, isAuth: true, isLoading: false, isError: false, response: payload, role: payload.role, token: payload.token };
        case REGISTER:
            return { ...state, isLoading: false, isError: false, response: payload };
        case LOGOUT:
            return { ...state, isLoading: false, isError: false, response: "", role: "", isAuth: false };
        case LSTOKEN:
            return { ...state, isLoading: false, isError: false, isAuth: payload.isAuth, token: payload.token, role: payload.role.role };
        default:
            return state;
    }
}