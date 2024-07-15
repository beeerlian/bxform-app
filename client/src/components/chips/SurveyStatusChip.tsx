import { Circle, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { SurveyStatus } from "types/dto-types";

export default function SurveyStatusChip(props: { status: SurveyStatus }) {
  const { status } = props;

  const activeColorBrand = useColorModeValue("brand.500", "white");
  const closedColorBrand = useColorModeValue("red.500", "white");
  const draftColorBrand = useColorModeValue("gray.500", "white");

  function Indicator() {
    switch (status) {
      case SurveyStatus.Active:
        return <Circle size="10px" bg="brand.500" />;

      case SurveyStatus.Closed:
        return <Circle size="10px" bg="red.500" />;
      default:
        return <Circle size="10px" bg="gray.500" />;
    }
  }

  function StatusText() {
    switch (status) {
      case SurveyStatus.Active:
        return (
          <Text pl="8px" fontSize="14" color="brand.500" fontWeight="semibold">
            Active
          </Text>
        );
      case SurveyStatus.Closed:
        return (
          <Text pl="8px" fontSize="14" color="red.500" fontWeight="semibold">
            Closed
          </Text>
        );
      default:
        return (
          <Text pl="8px" fontSize="14" color="gray.500" fontWeight="semibold">
            Draft
          </Text>
        );
    }
  }

  return (
    <Flex
      justifyContent="center"
      //       direction={{ base: "column", md: "row" }}
      align={{ base: "start", md: "center" }}
      transition="0.2s linear"
      px={{ base: "5px", md: "10px" }}
      //       w="20px"
      //       h="20px"
      borderRadius="36"
      bg="white"
    >
      <Indicator />
      <StatusText />
    </Flex>
  );
}
