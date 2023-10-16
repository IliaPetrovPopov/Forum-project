import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createUserHandle, getUserByHandle } from "../../services/user.service";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
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
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../services/document-verifications/user-doc-verification";
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../common/constants";

const Register = () => {
  const { setContext } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    handle: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const onRegister = (e) => {
    e.preventDefault();

    
    if (!form.email || !validateEmail(form.email)) {
      return;
    }

    if (!form.password || !validatePassword(form.password)) {
      return;
    }

    if (!form.handle) {
      return toast.warn("Username is required");
    }

    if (!form.firstName || !validateName(form.firstName)) {
      return;
    }

    if (!form.lastName || !validateName(form.lastName)) {
      return;
    }

    getUserByHandle(form.handle)
      .then((snapshot) => {
        if (snapshot.exists()) {
          toast.warn(
            `Username ${form.handle} has already been taken. Please try another one`
          );
          throw new Error(`Username ${form.handle} has already been taken!`);
        }
        return registerUser(form.email, form.password);
      })
      .then((credential) => {
        return createUserHandle(
          form.handle,
          credential.user.uid,
          form.email,
          form.firstName,
          form.lastName
        ).then(() => {
          setContext({
            user: credential.user,
          });
        });
      })
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.error(e));
  };

  return (
    <Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.800"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"red.50"} boxShadow={"lg"} p={8}>
          <form onSubmit={onRegister}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    borderColor={"gray.400"}
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                  />
                </FormControl>
              </Box>
              ≈
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    borderColor={"gray.400"}
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="handle" pt={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                borderColor={"gray.400"}
                type="text"
                name="handle"
                value={form.handle}
                onChange={handleChange("handle")}
              />
            </FormControl>
            <FormControl id="email" pt={4} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                borderColor={"gray.400"}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl id="password" pt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  borderColor={"gray.400"}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange("password")}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={4}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.600",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"red.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
