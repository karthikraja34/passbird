import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
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

function VerifyTOTP({ user, onVerificationSuccess }) {
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
      const loggedUser = await Auth.verifyTotpToken(
        user,
        code,
        "SOFTWARE_TOKEN_MFA"
      );
      setError(null);
      onVerificationSuccess(loggedUser.accessToken);
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
    </>
  );
}

function RegisterTOTP({ user, onVerificationSuccess }) {
  const [qrCode, setQRCode] = useState(null);

  const setupTOTP = () => {
    console.log("Challenge : ", user.challengeName);
    Auth.setupTOTP(user).then((code) => {
      const str =
        "otpauth://totp/AWSCognito:" +
        user.username +
        "?secret=" +
        code +
        "&issuer=Cognito";
      setQRCode(str);
    });
  };

  useEffect(() => {
    setupTOTP();
  }, []);

  return (
    <>
      <Flex
        align={"center"}
        grow={1}
        direction="column"
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
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
            {qrCode && <QRCode value={qrCode} />}
            <Heading fontSize={"2xl"} marginTop={5}>
              Scan this with your authenticator
            </Heading>
          </Box>
        </Stack>
        <VerifyTOTP user={user} onVerificationSuccess={onVerificationSuccess} />
      </Flex>
    </>
  );
}

export default RegisterTOTP;
