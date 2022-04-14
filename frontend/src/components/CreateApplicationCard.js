import {
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { getToken } from "../utils/auth";

export default function CreateApplicationCard({ onCreateSuccess }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [applicationName, setApplicationName] = useState(null);
  const [chain, setChain] = useState(null);
  const [error, setError] = useState(null);

  const initialRef = useRef();

  const onSubmit = () => {
    if (!applicationName || !chain) {
      setError("Please enter application name and chain");
    }

    fetch("http://localhost:8000/api/v1/applications/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ chain: chain, name: applicationName }),
    })
      .then((e) => {
        onCreateSuccess();
        onClose();
      })
      .catch((e) => console.log("Error  : ", e));
  };

  return (
    <>
      <Box
        maxW={"400px"}
        bg={"white"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        rounded={"md"}
        display={"flex"}
        alignItems={"center"}
      >
        <Box p={6} alignItems={"center"}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Text color={"gray.500"}>
              Click the below button to get started with a new application
            </Text>
          </Stack>

          <Button
            w={"full"}
            mt={2}
            bg={useColorModeValue("blue.500", "blue.600")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={onOpen}
          >
            Create Application
          </Button>
        </Box>
      </Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new app</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {error && (
              <Stack paddingBottom={5}>
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              </Stack>
            )}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setApplicationName(e.target.value)}
                ref={initialRef}
                placeholder="Enter app name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Chain</FormLabel>
              <Select
                placeholder="Select Chain"
                onChange={(e) => setChain(e.target.value)}
              >
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
                <option value="bitcoin">Bitcoin</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
