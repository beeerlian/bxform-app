import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { IPQuestionOptionType, QuestionOptionType } from "types/dto-types";
import { Questions, Question_Types } from "__generated__/graphql";
import EssaiInput from "./EssaiInput";
import IPInput from "./IPInput";
import MultipleChoice from "./MultipleInput";
import OptionInput from "./OptionInput";

const ratioInputData: QuestionOptionType[] = [
  {
    value: 0,
    label: "Sangat Kurang",
  },
  {
    value: 1,
    label: "Kurang",
  },
  {
    value: 2,
    label: "Cukup",
  },
  {
    value: 3,
    label: "Baik",
  },
  {
    value: 4,
    label: "Sangat Baik",
  },
];

const ipInputData: IPQuestionOptionType = {
  importance: ratioInputData,
  performance: ratioInputData,
};

export default function QuestionInput({
  question,
  questionType,
  ...props
}: {
  question?: Questions;
  questionType?: Question_Types;
  [x: string]: any;
}) {

  const brandColor = useColorModeValue("bg.100", "navy.700");
  const onChange = (value: number): void => {

  };

  switch (questionType?.code) {
    case "essai":
      return <EssaiInput  {...props} />;
      
    case "option":
      return (
        <OptionInput
          onValueChanged={onChange}
          options={ratioInputData}
          {...props}
        />
      );

    case "ipa":
      return (
        <IPInput
          {...props}
          options={ipInputData}
          onValueChanged={function (value: number): void {
            console.log("value", value);
          }}
        />
      );

    case "multiple":
      return (
        <MultipleChoice
          options={ratioInputData}
          onValueChanged={onChange}
          {...props}
        />
      );

    default:
      return <Box borderRadius={16} backgroundColor={brandColor} p={4} {...props}>
      <Text fontSize="m" mb={2}>
        Tipe pertayaan ini tidak memiliki isian
      </Text>
      
    </Box>;
  }
}
