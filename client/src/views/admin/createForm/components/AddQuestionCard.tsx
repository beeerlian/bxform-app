import { AddIcon } from "@chakra-ui/icons";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";

export default function AddQuestionCard(props: { [x: string]: any }) {
  const tertiaryColor = useColorModeValue("white", "brand.500");
  const textColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");

  console.log("AddQuestionCard -> props", props);

  return (
    <Card py="15px" {...props}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <AddIcon color={brandColor} mr={4} />
        <Text fontSize="md" fontWeight="600" mt="2px">
          Tambahkan pertanyaan
        </Text>
      </Flex>
    </Card>
  );
}
