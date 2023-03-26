import { getProductAct } from "../Redux/products/action"
import { ProductCard } from "./ProductCard"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Buttons } from "./Buttons";

export const ProductList = () => {
    const dispatch = useDispatch();
    const prodStore = useSelector(store => store.productReducer);
    const store = useSelector(store => store.authReducer);
    const type = typeof (prodStore.products);
    const limit = prodStore.response.limit;
    const total = prodStore.response.data;
    const buttons = [];
    const handlePageChange = (page) => {
        dispatch(getProductAct(page));
    }
    useEffect(() => {
        try {
            dispatch(getProductAct());
        } catch (e) {
            console.log(e.message);
        }
    }, [])
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        buttons.push(i);
    }
    if (prodStore.isLoading) {
        return (
            <VStack align={"center"} m={"20vh auto"} width={"40%"} >
                <Image width={"10vw"} src="https://i.ibb.co/3mVT24P/137894-loading.gif" alt="https://i.ibb.co/3mVT24P/137894-loading.gif" />
                <Text fontSize={"3xl"}>Loading products.....</Text>
            </VStack>
        )
    }
    if (prodStore.isError) {
        return (
            <VStack align={"center"} m={"20vh auto"} width={"40%"} >
                <Image borderRadius={"20px"} width={"20vw"} src="https://i.ibb.co/L6pZv8q/106720-404-page.gif" alt="https://i.ibb.co/L6pZv8q/106720-404-page.gif" />
                <Text fontSize={"3xl"}>404 : NOT FOUND</Text>
            </VStack>
        )
    }
    return (
        <div>
            <Text fontSize={"4xl"}>Welcome {store.role}</Text>
            <Grid mb={"60px"} p={"2%"} templateRows="repeat(4,1fr)" templateColumns="repeat(4,1fr)" gap={"2%"}>
                {type !== "string" && prodStore.products.map(e => {
                    return <ProductCard key={e._id} data={e} />
                })}
            </Grid>
            <HStack justify={"center"} p={"20px 0px"}>
                <Text fontSize={"2xl"}>Page</Text>
                {
                    buttons.map(e => {
                        return <Buttons key={e} handlePageChange={handlePageChange} page={e} />
                    })
                }
            </HStack>
        </div>
    )
}