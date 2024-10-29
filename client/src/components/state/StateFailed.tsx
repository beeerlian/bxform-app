import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { IoReloadCircle } from "react-icons/io5";

export default function StateFailedUI({
  error,
  title,
  onRefresh,
  actionChild,
  ...props
}: {
  error: string;
  title?: string;
  onRefresh?: any;
  actionChild?: any;
  [key: string]: any;
}) {
  const mainText = useColorModeValue("navy.700", "white");
  return (
    <Flex justify="center" align="center" {...props} direction="column">
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
        fontWeight="bold"
        color={mainText}
      >
        {title ?? "Tidak dapat memuat"}
      </Text>
      <Text
        fontSize={{ base: "m", md: "l", lg: "xl", xl: "2xl" }}
        color={mainText}
      >
        {error}
      </Text>
      {actionChild ? (
        actionChild
      ) : (
        <Button
          colorScheme="brand"
          mt="30px"
          variant="outline"
          color={mainText}
          onClick={onRefresh}
        >
          <IoReloadCircle size={"35px"} />
          Refresh
        </Button>
      )}
    </Flex>
  );
}
