import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Questions, Question_Types } from "__generated__/graphql";
import QuestionInput from "../input/QuestionInput";

export enum QuestionModeEnum {
  edit,
  view,
}

export default function QuestionCard({
  question,
  questionTypes = [],
  mode,
}: {
  question: Questions;
  questionTypes: Question_Types[];
  mode: QuestionModeEnum;
}) {
  const tertiaryColor = useColorModeValue("white", "brand.500");
  const textColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");

  const disabled = mode === QuestionModeEnum.view;
  return (
    <Card py="15px" mb={"24px"}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Flex direction="column">
          <Text fontSize="small" fontWeight="400">
            Aspek yang ingin dinilai
          </Text>
          <Text fontSize="md" fontWeight="600" mt="2px">
            {question.topic ?? "-"}
          </Text>
        </Flex>
        <Select
          fontSize="small"
          disabled={disabled}
          maxW={{ base: "30%", "2xl": "200px", md: "50%" }}
          variant="subtitle"
          defaultValue={question.question_type.code}
          backgroundColor={brandColor}
          width="unset"
          icon={!disabled && <ChevronDownIcon />}
          color={tertiaryColor}
          fontWeight="700"
        >
          {questionTypes.map((type) => (
            <option key={type.code} value={type.code}>
              {type.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Text fontSize="md" fontWeight="600" mt="2px">
        {question.content}
      </Text>
      <br />
      <QuestionInput question={question} disabled={disabled} />
      <br />
      <Text fontSize="small" fontWeight="300" mt="2px" color="secondary">
        {question.caption}
      </Text>
    </Card>
  );
}
