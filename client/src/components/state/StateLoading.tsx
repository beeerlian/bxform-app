import { CircularProgress, Flex } from "@chakra-ui/react";

export default function StateLoadingUI({ ...props }: { [key: string]: any }) {
  return (
    <Flex justify="center" align="center" {...props}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  );
}
