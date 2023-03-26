import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SpinnerIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../Redux/authentication/action';
import { Link } from 'react-router-dom';

export const Register = () => {
    const envCall = () => {
        console.log(process.env);
        console.log(process.env.DATA);
    }
    envCall();
    const dispatch = useDispatch();
    const state = useSelector(store => store.authReducer);
    const response = state.response;
    const [showPassword, setShowPassword] = useState(false);
    const initState = { username: undefined, email: undefined, dob: undefined, password: undefined, role: "user" }
    const [regi, setRegi] = useState(initState);
    const date = new Date();
    const handleChange = (e, type) => {
        if (type === "username") {
            setRegi({ ...regi, username: e.target.value });
        } else if (type === "password") {
            setRegi({ ...regi, password: e.target.value });
        } else if (type === "dob") {
            if (e.target.value.length <= 10) {
                setRegi({ ...regi, dob: e.target.value });
            }
        } else if (type === "email") {
            setRegi({ ...regi, email: e.target.value });
        } else if (type === "role") {
            console.log(e.target.value, type)
            setRegi({ ...regi, role: e.target.value });
        }
    }
    const handleSubmit = () => {
        dispatch(userRegister(regi));
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} w={"40%"} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                {state.isError && <Alert borderRadius={"15px"} status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{response.msg}</AlertDescription>
                </Alert>}
                {state.response.status && <Alert borderRadius={"15px"} status="success">
                    <AlertIcon />
                    <AlertTitle>User registered!</AlertTitle>
                    <AlertDescription>{response.msg}. You may <Link style={{ textDecoration: "underline", color: "#4299e1" }} to={"/login"}>proceed</Link> to login.</AlertDescription>
                </Alert>}
                {state.isLoading && <Alert borderRadius={"15px"} status="loading">
                    <AlertIcon />
                    <AlertTitle>Signing up</AlertTitle>
                </Alert>}
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="username" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder='Enter username' type="text" onChange={(e) => { handleChange(e, "username") }} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="dob" isRequired>
                                    <FormLabel>Date of birth</FormLabel>
                                    <Input type="date" min="1900-01-01" defaultValue={setRegi.dob} max={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`} onChange={(e) => { handleChange(e, "dob") }} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="role" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select defaultValue={regi.role} onChange={(e) => { handleChange(e, "role") }}>;
                                <option value={"seller"} >Seller</option>
                                <option value={"user"} >Buyer</option>
                            </Select>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e) => { handleChange(e, "email") }} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => { handleChange(e, "password") }} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleSubmit}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                isDisabled={state.isLoading}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                {state.isLoading && <SpinnerIcon />}
                                {state.isLoading ?
                                    "Signing up"
                                    :
                                    "Sign up"
                                }
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link style={{ color: "#4299e1" }} to={"/login"} color={'blue'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}