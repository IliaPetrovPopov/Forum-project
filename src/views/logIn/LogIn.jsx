import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { MIN_PASSWORD_LENGTH } from "../../common/constants";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import "./LogIn.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

const LogIn = () => {
  const { setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();

    const isBlocked = query(
      ref(db, "blocked-users"),
      orderByChild("email"),
      equalTo(form.email)
    );
    get(isBlocked)
      .then((result) => {
        if (result.exists()) {
          return toast.error(`This account has been blocked!`);
        } else {
          if (!form.email) {
            return toast.warn("Email is required");
          }

          if (!form.password || form.password.length < MIN_PASSWORD_LENGTH) {
            return toast.warn(
              `Password is required and must be at least ${MIN_PASSWORD_LENGTH} symbols`
            );
          }

          loginUser(form.email, form.password)
            .then((credential) => {
              setContext({
                user: credential.user,
              });
            })
            .then(() => {
              toast.success("Successfully logged in");
              navigate("/");
            })
            .catch(() => toast.error("Email and password do not match"));
        }
      })
      .catch((e) => console.error(e.message));
  };

  return (
    <Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.800"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={'green.50'}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                                    borderColor={"gray.400"}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                                    borderColor={"gray.400"}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange("password")}
              />
            </FormControl>
            <Button
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.600",
              }}
              onClick={onLogin}
            >
              Log in
            </Button>
              <Link to="/reset-password" align='center' color="green.600">
                Forgotten password?
              </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LogIn;
