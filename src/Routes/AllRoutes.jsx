import { Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../Components/PrivateRoute";
import { AddNewProd } from "../Pages/AddNewProd";
import { Admin } from "../Pages/Admin";
import { DetailProduct } from "../Pages/DetailProduct";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { ProductEdit } from "../Pages/ProductEdit";
import { Products } from "../Pages/Products";
import { Register } from "../Pages/Register";
import { SingleProductEdit } from "../Pages/SingleProductEdit";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<PrivateRoute><AddNewProd /></PrivateRoute>} />
            <Route path="/products/:id" element={<PrivateRoute><DetailProduct /></PrivateRoute>} />
            <Route path="/products/edit" element={<PrivateRoute><ProductEdit /></PrivateRoute>} />
            <Route path="/products/edit/:id" element={<PrivateRoute><SingleProductEdit /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<PrivateRoute>{<Admin />}</PrivateRoute>} />
            <Route path="*" element={<Text fontWeight={"bold"} fontSize={"4xl"}>Page you are requesting is not Found</Text>} />
        </Routes>
    )
}