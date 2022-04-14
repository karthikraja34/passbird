import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function VerifyTOTP({ user, onVerificationSuccess }) {
  const [totpCode, setTOTPCode] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyTOTP = async (code) => {
    if (!code || code.length < 6) {
      setError("Please enter 6 digit authentication code");
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await Auth.confirmSignIn(
        user,
        code,
        "SOFTWARE_TOKEN_MFA"
      );
      setError(null);
      onVerificationSuccess(loggedUser.signInUserSession.idToken);
    } catch (e) {
      if (e.name == "CodeMismatchException") {
        setError("Your code is incorrect");
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        align={"center"}
        grow={1}
        direction="column"
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={4} mx={"auto"} maxW={"lg"} py={2} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            display="flex"
            minWidth={500}
            flexDirection="column"
            alignItems="center"
            p={8}
          >
            {error && (
              <Stack width="100%" paddingBottom={5}>
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              </Stack>
            )}
            <Input
              onChange={(e) => setTOTPCode(e.target.value)}
              type="number"
              placeholder="Enter your verification code"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  verifyTOTP(totpCode);
                }
              }}
            />
            <Button
              onClick={() => verifyTOTP(totpCode)}
              marginTop={5}
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="blue"
            >
              Verify
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
