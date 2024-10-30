import { AddIcon } from "@chakra-ui/icons";
import { Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { Question_Types, Questions } from "__generated__/graphql";
import Card from "components/card/Card";

export enum QuestionModeEnum {
  edit,
  view,
}

export default function AddQuestionCard({
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
      <Icon as={AddIcon}/>
      <Text fontSize="small" fontWeight="400">
            Tambahkan pertanyaan baru
          </Text>
    </Card>
  );
}
