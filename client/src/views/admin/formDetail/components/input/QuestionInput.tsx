import { IPQuestionOptionType, QuestionOptionType } from "types/dto-types";
import { Questions } from "__generated__/graphql";
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
    value: 3,
    label: "Sangat Baik",
  },
];

const ipInputData: IPQuestionOptionType = {
  importance: ratioInputData,
  performance: ratioInputData,
};

export default function QuestionInput({
  question,
  ...props
}: {
  question: Questions;
  [x: string]: any;
}) {
  const onChange = (value: number): void => {};

  switch (question.question_type.code) {
    case "essai":
      return <EssaiInput question={question} {...props} />;

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
      return <div></div>;
  }
}
