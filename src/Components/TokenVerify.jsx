import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { setLsToken } from "../Redux/authentication/action";

export const TokenVerify = (data) => {
    const dispatch = useDispatch();
    const tokenData = {};
    const lsData = JSON.parse(localStorage.getItem("loginStatus_appFS"));
    const token = data || lsData.token;
    const decyphered = decodeToken(token);
    const expired = isExpired(token);
    console.log(decyphered, expired, token);
    if (decyphered) {
        if (data) {
            tokenData.role = decyphered.role;
            tokenData.isAuth = true;
        } else if (lsData.isAuth && expired === false) {
            tokenData.role = decyphered.role;
            tokenData.isAuth = lsData.isAuth;
        }
    }
    if (tokenData.isAuth) {
        dispatch(setLsToken(tokenData))
    }
}