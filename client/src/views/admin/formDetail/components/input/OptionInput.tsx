import { Radio, RadioGroup } from "@chakra-ui/react";
import { QuestionOptionType } from "types/dto-types";

export interface OptionInputProps {
  options: QuestionOptionType[];
  onValueChanged: (value: number) => void;
  [x: string]: any;
}

export default function OptionInput({
  options,
  onValueChanged,
  ...rest
}: OptionInputProps) {
  return (
    <RadioGroup {...rest} onChange={(e) => onValueChanged(Number(e))}>
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          paddingRight="10px"
          disabled={rest.disabled}
        >
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
