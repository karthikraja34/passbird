import { Container, Grid, Flex, useColorModeValue } from "@chakra-ui/react";
import ApplicationCard from "../components/ApplicationCard";
import CreateApplicationCard from "../components/CreateApplicationCard";
import useFetch from "../hooks/useFetch";
import { getToken } from "../utils/auth";

export default function Dashboard() {
  const { response, loading, error, refetch } = useFetch(
    "http://localhost:8000/api/v1/applications/",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return (
    <Flex grow={1} bg={useColorModeValue("gray.50", "gray.800")}>
      <Container py={4} maxW="container.xl">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <CreateApplicationCard onCreateSuccess={() => refetch()} />
          {response &&
            response.results.map((application) => (
              <>
                <ApplicationCard application={application} />
              </>
            ))}
        </Grid>
      </Container>
    </Flex>
  );
}
