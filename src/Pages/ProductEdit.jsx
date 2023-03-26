import { Button } from "@chakra-ui/react"
import {  useNavigate } from "react-router-dom"
import { ProductList } from "../Components/ProductList"

export const ProductEdit = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => { navigate("/products/add") }}></Button>
            <ProductList />
        </>
    )
}