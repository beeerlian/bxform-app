import { Input, Text } from "@chakra-ui/react";
import { Questions } from "__generated__/graphql";
import { QuestionModeEnum } from "../questions/QuestionCard";

export default function EssaiInput({
  question,
  mode,
  ...props
}: {
  mode: QuestionModeEnum;
  question: Questions;
  [x: string]: any;
}) {
  if (mode == QuestionModeEnum.view) {
    return <Text>{question.content}</Text>;
  }
  return (
    <Input
      isRequired={true}
      variant="auth"
      fontSize="sm"
      ms={{ base: "0px", md: "0px" }}
      type="text"
      placeholder="Total audience youre targeting"
      mb="24px"
      fontWeight="500"
      size="lg"
      {...props}
    />
  );
}
