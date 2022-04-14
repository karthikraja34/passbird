import {
  Box,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  StatHelpText,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function ApplicationCard({ application }) {
  const { hasCopiedApplicationId, onCopy: onCopyApplicationId } = useClipboard(
    application.application_id
  );
  const { hasCopied, onCopy: onCopySecret } = useClipboard(application.secret);
  const toast = useToast();

  return (
    <>
      <Box
        maxW={"400px"}
        bg={"white"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        rounded={"md"}
      >
        <Stat p={4}>
          <StatNumber>{application.name}</StatNumber>
          <Badge colorScheme="green">{application.chain}</Badge>
        </Stat>
        <Stat p={4}>
          <StatLabel>Application ID</StatLabel>
          <StatHelpText alignItems={"center"}>
            {application.application_id}
            <Button
              marginLeft={2}
              onClick={() => {
                onCopyApplicationId();
                toast({
                  title: "Copied",
                  variant: "solid",
                  duration: 3000,
                  isClosable: true,
                  position: "top-right",
                });
              }}
            >
              <CopyIcon />
            </Button>
          </StatHelpText>
          <StatLabel>Application Secret</StatLabel>
          <StatHelpText>
            {application.secret}
            <Button
              marginLeft={2}
              onClick={() => {
                onCopySecret();
                toast({
                  title: "Copied",
                  variant: "solid",
                  duration: 3000,
                  isClosable: true,
                  position: "top-right",
                });
              }}
            >
              <CopyIcon />
            </Button>
            {hasCopiedApplicationId}
          </StatHelpText>
        </Stat>
      </Box>
    </>
  );
}
