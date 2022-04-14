import {
  Box,
  Flex,
  Button,
  Menu,
  Container,
  useColorModeValue,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <>
      <Box bg={useColorModeValue("blue.100", "blue.900")} px={4}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              <Link as={RouteLink} to="/">
                <Text fontSize="3xl" fontWeight="bold" color="blue.400">
                  Metakeep
                </Text>
              </Link>
            </Box>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Menu>
                  <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                  >
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      as={RouteLink}
                      to="/signin"
                      variant={"link"}
                    >
                      Sign In
                    </Button>
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"blue.400"}
                      as={RouteLink}
                      to="/signup"
                      _hover={{
                        bg: "blue.300",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
