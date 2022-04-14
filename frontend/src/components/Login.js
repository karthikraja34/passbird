import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { Link as RouteLink } from "react-router-dom";
import PasswordInput from "./PasswordInput";

export default function Login({ onSignIn }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInUser = async () => {
    setLoading(true);
    try {
      const user = await Auth.signIn({
        username: username,
        password: password,
      });
      onSignIn(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          maxWidth={500}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
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
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    signInUser();
                  }
                }}
                onChange={(e) => setPassword(e.target.value)}
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
                loadingText="Signing In"
                onClick={() => signInUser()}
              >
                Sign in
              </Button>
              <Link color={"blue.400"} to="/signup" as={RouteLink}>
                Sign up now
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
