import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../../../config/firebase-config";
import { useLocation, useNavigate } from "react-router";
import {
  detailsCheck,
  detailsValidation,
  updates,
} from "./validations/details";
import { toast } from "react-toastify";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'

export const Settings = () => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
  });

  const inputRef = useRef(null);
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const user = auth.currentUser;
  const location = useLocation();
  const logInPass = location.state.pass;

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const handleChange = (prop) => (e) => {
    setDetails({
      ...details,
      [prop]: e.target.value,
    });
  };

  // Hello world
  
  const handleSubmit = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, logInPass);

      await reauthenticateWithCredential(user, credential);

      detailsCheck(details);
      await detailsValidation(details, photo, email, password);
      await updates(db, user, userData, details, photo, email, password);

      toast.info("Changes made successfully! Please log in again");
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Flex
      h={'109vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>Selected Image</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={photo ? URL.createObjectURL(photo) : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} />
            </Center>
            <Center w="full">
              <Button w="full" onClick={handleImageUpload}>Change Icon</Button>
              <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleUpload}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="first-name" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="FirstName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={handleChange("firstName")}
          />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="LastName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={handleChange("lastName")}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack spacing={7} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
