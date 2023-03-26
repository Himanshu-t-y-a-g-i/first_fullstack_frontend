import { HStack, Image } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { userLogout } from "../Redux/authentication/action";
// import { TokenVerify } from "./TokenVerify";

export const Navbar = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.authReducer);
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(userLogout(navigate));
    }
    return (
        <HStack style={{ zIndex: 2 }} position={"relative"} borderRadius={"0px 0px 20px 20px"} bg={"#f08535"} h={"50px"} justify={"space-between"} p={"0px 3%"} >
            <Link style={{ height: "100%" }} to="/"><Image borderRadius={"20px"} src="https://i.ibb.co/7GmpfGc/Shop-Free-Cropped.jpg" height={"100%"} alt={"https://i.ibb.co/7GmpfGc/Shop-Free-Cropped.jpg"} /></Link>
            <HStack justify={"right"} gap={"10%"} fontSize={"xl"}>
                <Link to="/products">Products</Link>
                {store.isAuth === false && <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
                }
                {store.isAuth === true && (store.role === "admin" || store.role === "seller") && <Link to={"/products/edit"}>Edit_Products</Link>}
                {store.isAuth === true && <Link onClick={handleLogout}>Logout</Link>}
                {store.isAuth === true && store.role === "admin" &&
                    <Link to="/admin">Admin</Link>
                }
            </HStack>
        </HStack>
    )
}