import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postProductAct } from "../Redux/products/action";

export const AddNewProd = () => {
    const authStore = useSelector(store => store.authReducer);
    const prodStore = useSelector(store => store.productReducer);
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    const [newData, setNewData] = useState({
        title: undefined,
        description: undefined,
        price: undefined,
        discountPercentage: undefined,
        rating: undefined,
        stock: undefined,
        brand: undefined,
        category: undefined,
        thumbnail: undefined,
        images: []
    });
    const handleChange = (e, type) => {
        const newObj = {
            ...newData
        }
        newObj[type] = e.target.value;
        setNewData(newObj);
    }
    const handleClick = () => {
        dispatch(postProductAct(authStore.token, newData, setStatus));
    }
    return (
        <Box p={"40px 0px"}>
            <Text fontWeight={"bold"} fontSize={"4xl"}>Add new product</Text>
            <FormControl margin={"auto"} width={"40%"}>
                <VStack align={"start"} spacing={"15px"}>
                    {prodStore.isError && <Alert borderRadius={"15px"} status='error'>
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{prodStore.response.msg}</AlertDescription>
                    </Alert>}
                    {prodStore.isLoading && <Alert borderRadius={"15px"} status="loading">
                        <AlertIcon />
                        <AlertTitle>Loading...</AlertTitle>
                    </Alert>}
                    {prodStore.response.status === "success" && status === true && <Alert borderRadius={"15px"} status="success">
                        <AlertIcon />
                        <AlertTitle>Product added</AlertTitle>
                    </Alert>}
                    <FormLabel>Title</FormLabel>
                    <Input type={"text"} value={newData.title} onChange={e => handleChange(e, "title")} />
                    <FormLabel>Description</FormLabel>
                    <Input type={"text"} value={newData.description} onChange={e => handleChange(e, "description")} />
                    <FormLabel>Price</FormLabel>
                    <Input type={"number"} value={newData.price} onChange={e => handleChange(e, "price")} />
                    <FormLabel>Discount Percentage</FormLabel>
                    <Input type={"number"} value={newData.discountPercentage} onChange={e => handleChange(e, "discountPercentage")} />
                    <FormLabel>Rating</FormLabel>
                    <Input type={"number"} value={newData.rating} onChange={e => handleChange(e, "rating")} />
                    <FormLabel>Stock</FormLabel>
                    <Input type={"number"} value={newData.stock} onChange={e => handleChange(e, "stock")} />
                    <FormLabel>Brand</FormLabel>
                    <Input type={"text"} value={newData.brand} onChange={e => handleChange(e, "brand")} />
                    <FormLabel>Category</FormLabel>
                    <Input type={"text"} value={newData.category} onChange={e => handleChange(e, "category")} />
                    <FormLabel>Thumbnail</FormLabel>
                    <Input type={"url"} value={newData.thumbnail} onChange={e => handleChange(e, "thumbnail")} />
                    {/* <FormLabel>Images</FormLabel>
                <Input type={"url"} value={newData.} onChange={ } /> */}
                    <Button width={"100%"} onClick={handleClick}>Update</Button>
                </VStack>
            </FormControl>
        </Box>
    )
}