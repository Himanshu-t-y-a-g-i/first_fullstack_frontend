import { Box, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const CategoryNav = () => {
    return (
        <Box position={"sticky"} top={0} pb={"10px"} mt={"-50px"} borderRadius={"0px 0px 20px 20px"} style={{ zIndex: 1 }} color={"white"} bgColor={"#7b3e02"}>
            <Text height={"55px"} fontSize={"3xl"} >Products</Text>
            <HStack fontSize={"xl"} justify={"center"} >
                <Link>Mobile</Link>
                <Link>Laptop</Link>
                <Link>Television</Link>
                <Link>Speaker</Link>
            </HStack>
        </Box>
    )
}