import {
  Flex,
  Select,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import QuestionInput from "views/admin/formDetail/components/input/QuestionInput";
import { Questions, Question_Types } from "__generated__/graphql";

export default function CreateQuestionCard({
  question,
  questionTypes,
}: {
  question?: Questions;
  questionTypes?: Question_Types[] | null;
}) {
  const tertiaryColor = useColorModeValue("white", "brand.500");
  const textColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");

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
        <Skeleton isLoaded={!!questionTypes} borderRadius={16}></Skeleton>
        <Select
          fontSize="small"
          maxW={{ base: "30%", "2xl": "200px", md: "50%" }}
          variant="subtitle"
          defaultValue={question.question_type.code}
          backgroundColor={brandColor}
          width="unset"
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
      <QuestionInput question={question} />
      <br />
      <Text fontSize="small" fontWeight="300" mt="2px" color="secondary">
        {question.caption}
      </Text>
    </Card>
  );
}
