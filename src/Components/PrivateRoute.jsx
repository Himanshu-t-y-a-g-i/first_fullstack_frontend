import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
    const store = useSelector(store => store.authReducer);
    if (store.role === "admin" && children.type.name === "Admin" && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller" || store.role === "admin") && children.type.name === "DetailProduct" && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && children.type.name === "ProductEdit" && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && children.type.name === "SingleProductEdit" && store.isAuth === true) {
        return children;
    }
    if ((store.role === "admin" || store.role === "seller") && children.type.name === "AddNewProd" && store.isAuth === true) {
        return children;
    }
    return <Navigate to={"/login"} />
}