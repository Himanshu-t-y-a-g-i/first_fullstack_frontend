import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
    Text,
    AlertIcon,
    Alert,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLogin } from '../Redux/authentication/action';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(store => store.authReducer);
    const response = state.response;
    const [loginType, setLoginType] = useState(false);
    if (response.status === "success") {
        localStorage.setItem("loginStatus_appFS", JSON.stringify({ isAuth: true, token: response.token }));
    }
    const initState = {
        email: "",
        password: "",
        username: ""
    }
    const [cred, setCred] = useState(initState);
    const handleChange = (e, type) => {
        if (type === "email") {
            setCred({ ...cred, email: e.target.value });
        } else if (type === "password") {
            setCred({ ...cred, password: e.target.value });
        } else if (type === "username") {
            setCred({ ...cred, username: e.target.value })
        }
    }
    const handleSubmit = () => {
        dispatch(userLogin(cred, navigate));
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} width={'30%'} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in</Heading>
                </Stack>
                {state.isError && <Alert borderRadius={"15px"} status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{response.msg}</AlertDescription>
                </Alert>}
                {state.response.status && <Alert borderRadius={"15px"} status="success">
                    <AlertIcon />
                    <AlertTitle>Signed in!</AlertTitle>
                    <AlertDescription>{response.msg}</AlertDescription>
                </Alert>}
                {state.isLoading && <Alert borderRadius={"15px"} status="loading">
                    <AlertIcon />
                    <AlertTitle>Signing in</AlertTitle>
                </Alert>}
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Checkbox defaultChecked={loginType} onChange={() => { setLoginType(!loginType) }}>Login with username</Checkbox>
                        {!loginType ?
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" placeholder="Enter email" onChange={(e) => { handleChange(e, "email") }} />
                            </FormControl>
                            :
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="email" placeholder="Enter username" onChange={(e) => { handleChange(e, "username") }} />
                            </FormControl>
                        }
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter password" onChange={(e) => { handleChange(e, "password") }} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>

                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={handleSubmit}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        <Stack>
                            <Text align={'center'}>
                                Not registered yet? <Link style={{ color: "#4299e1" }} to={"/login"} color={'blue'}>Register</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}