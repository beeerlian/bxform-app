import { Flex } from "@chakra-ui/react";
import { QuestionOptionType } from "types/dto-types";

const multipleInputData: QuestionOptionType[] = [
  {
    value: 0,
    label: "Kimia",
  },
  {
    value: 1,
    label: "Biologi",
  },
  {
    value: 2,
    label: "Elektro",
  },
  {
    value: 3,
    label: "Informatika",
  },
  {
    value: 3,
    label: "Agro",
  },
];

export interface MultipleChoiceProps {
  options: QuestionOptionType[];
  onValueChanged: (value: number) => void;
  [x: string]: any;
}

const MultipleChoice = ({
  options,
  onValueChanged,
  ...props
}: MultipleChoiceProps) => {
  return (
    <Flex direction="column">
      {multipleInputData.map((option) => (
        <label key={option.value}>
          <input
            {...props}
            type="checkbox"
            name="multipleChoice"
            disabled={props.disabled}
            value={option.value}
            onChange={() => onValueChanged(option.value)}
          />
          {option.label}
        </label>
      ))}
    </Flex>
  );
};

export default MultipleChoice;
