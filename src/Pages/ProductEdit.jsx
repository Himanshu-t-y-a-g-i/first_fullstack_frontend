import { Button, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ProductList } from "../Components/ProductList"

export const ProductEdit = () => {
    const navigate = useNavigate();
    return (
        <VStack mt={"30px"}>
            <Button onClick={() => { navigate("/products/add") }}>Add new product</Button>
            <ProductList />
        </VStack>
    )
}