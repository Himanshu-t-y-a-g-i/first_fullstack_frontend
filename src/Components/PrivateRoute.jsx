import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
    console.log(children.type.name);
    const store = useSelector(store => store.authReducer);
    if (store.role === "admin" && (children.type.name === "Admin" || children.type.name === "gu") && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller" || store.role === "user") && (children.type.name === "DetailProduct" || children.type.name === "yu") && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && (children.type.name === "ProductEdit" || children.type.name === "hc") && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && (children.type.name === "SingleProductEdit" || children.type.name === "Vc") && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && (children.type.name === "AddNewProd" || children.type.name === "mu") && store.isAuth === true) {
        return children;
    }
    return <Navigate to={"/login"} />
}