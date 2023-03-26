import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getSingleProd, updateProductAct } from "../Redux/products/action";

export const SingleProductEdit = () => {
    const authStore = useSelector(store => store.authReducer);
    const prodStore = useSelector(store => store.productReducer);
    const params = useParams();
    const dispatch = useDispatch();
    const [newData, setNewData] = useState({
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        brand: "",
        category: "",
        thumbnail: "",
        images: []
    });
    useEffect(() => {
        dispatch(getSingleProd(authStore.token, params.id, setNewData));
    }, [])
    const handleChange = (e, type) => {
        const newObj = {
            ...newData
        }
        newObj[type] = e.target.value;
        setNewData(newObj);
    }
    const handleClick = () => {
        dispatch(updateProductAct(authStore.token, newData, params.id));
    }
    return (
        <Box p={"40px 0px"}>
            <Text fontWeight={"bold"} fontSize={"4xl"}>Edit product section</Text>
            <FormControl margin={"auto"} width={"40%"}>
                <VStack align={"start"} spacing={"15px"}>
                    {prodStore.isError && <Alert borderRadius={"15px"} status='error'>
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{prodStore.response.msg || "Requested product is not found"}</AlertDescription>
                    </Alert>}
                    {prodStore.isLoading && <Alert borderRadius={"15px"} status="loading">
                        <AlertIcon />
                        <AlertTitle>Loading...</AlertTitle>
                    </Alert>}
                    {prodStore.response.status === "success" && <Alert borderRadius={"15px"} status="success">
                        <AlertIcon />
                        <AlertTitle>Details updated</AlertTitle>
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

// title: String,
//     description: String,
//     price: Number,
//     discountPercentage: Number,
//     rating: Number,
//     stock: Number,
//     brand: String,
//     category: String,
//     thumbnail: String,
//     images: Array