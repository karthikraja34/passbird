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
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import PasswordInput from "./PasswordInput";

export default function SignUp({ onSignUp }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    const isValid = validateData();
    if (!isValid) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signUp({
        username: username,
        password: password,
      });

      const user = await Auth.signIn({
        username: username,
        password: password,
      });

      onSignUp(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateData = () => {
    if (!username || !password) {
      setError("Username or Password cannot be empty");
      return false;
    }

    if (password.length < 8) {
      setError("Password should be mininum of 8 characters length");
      return false;
    }

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(password)) {
      setError("Password should contain atleast one special character");
      return false;
    }

    return true;
  };

  return (
    <Flex
      grow={1}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create an account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          maxWidth={500}
        >
          {error && (
            <Stack paddingBottom={5}>
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            </Stack>
          )}
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    registerUser();
                  }
                }}
              />
            </FormControl>
            <Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={loading}
                loadingText="Signing up"
                onClick={() => registerUser()}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
