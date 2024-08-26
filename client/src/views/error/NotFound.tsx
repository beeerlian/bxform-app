import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <Box textAlign="center" mt={20} p={4}>
      <Heading as="h1" size="2xl" mb={4}>
        404 Not Found
      </Heading>
      <Text fontSize="xl">
        Oops! The page you're looking for does not exist.
      </Text>
    </Box>
  );
};

export default NotFoundPage;
