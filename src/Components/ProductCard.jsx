import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom";
import "../Styles/product.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAct } from "../Redux/products/action";

export const ProductCard = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector(store => store.authReducer);
    const rating = [];
    const discount = (+data.price * +data.discountPercentage) / 100;
    const totalPrice = (+discount.toFixed(2) + +data.price);
    const handleClick = () => {
        navigate(`/products/${data._id}`);
    }
    for (let i = 1; i <= +data.rating; i++) {
        let val = i + 1000;
        rating.push(val);
    }
    const handleEdit = () => {
        navigate(`/products/edit/${data._id}`);
    }
    const handleDelete = () => {
        dispatch(deleteProductAct(store.token, data._id))
    }

    return (
        <Box shadow={"2xl"} borderRadius={"20px"}>
            <Box borderRadius={"20px 20px 0px 0px"} overflow="hidden">
                <Image onClick={handleClick} margin={"auto"} src={data.thumbnail} h={"200px"} transition={"transform .4s ease-in-out"} _hover={{ transform: "scale(1.1)" }} />
            </Box>
            <VStack p="0 8% 6%">
                <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>{data.brand}</Text>
                <Text textAlign={"left"} fontSize={"l"} >{data.title}</Text>
                <Text textAlign={"left"} fontSize={"l"}> <strike>$ {+totalPrice.toFixed(2)}</strike> </Text>
                <HStack textAlign={"left"}><Text fontWeight={"bold"} color={"red.500"} fontSize={"l"}>$ {data.price}</Text><i>{data.discountPercentage}% OFF</i></HStack>
                <HStack textAlign={"left"}><Text fontSize={"l"}>{data.rating} </Text>{rating.map(e => <StarIcon key={e} />)}</HStack>
            </VStack>
            {
                (store.role === "admin" || store.role === "seller") && <HStack display={"grid"} gridTemplateColumns={"1fr 1fr"} justify={"space-between"} p="5%" pt={0}>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </HStack>
            }
        </Box>
    )
}


    // "_id": "641c5462eacffe1e9773e096",
    // "title": "iPhone 9",
    // "description": "An apple mobile which is nothing like apple",
    // "price": 549,
    // "discountPercentage": 12.96,
    // "rating": 4.69,
    // "stock": 94,
    // "brand": "Apple",
    // "category": "smartphones",
    // "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    // "images": [
    // "https://i.dummyjson.com/data/products/1/1.jpg",
    // "https://i.dummyjson.com/data/products/1/2.jpg",
    // "https://i.dummyjson.com/data/products/1/3.jpg",
    // "https://i.dummyjson.com/data/products/1/4.jpg",
    // "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    // ],