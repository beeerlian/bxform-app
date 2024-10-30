import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { IPQuestionOptionType } from "types/dto-types";

export interface IPInputProps {
  options: IPQuestionOptionType;
  onValueChanged: (value: number) => void;
  
  [x: string]: any;
}

export default function IPInput({
  options,
  onValueChanged,
  
  ...rest
}: IPInputProps) {
  const brandColor = useColorModeValue("bg.100", "navy.700");
  return (
    <Flex direction="column">
      <Box borderRadius={16} backgroundColor={brandColor} p={4}>
        <Text fontSize="m" fontWeight="bold" mb={2}>
          Importance
        </Text>
        <RadioGroup {...rest} onChange={(e) => onValueChanged(Number(e))}>
          {options.importance.map((option) => (
            <Radio
              key={"importance-"+option.value}
              value={option.value}
              paddingRight="10px"
              disabled={rest.disabled}
            >
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </Box>
      <Box borderRadius={16} backgroundColor={brandColor} p={4} mt={4}>
        <Text fontSize="m" fontWeight="bold" mb={2}>
          Performace
        </Text>
        <RadioGroup {...rest} onChange={(e) => onValueChanged(Number(e))}>
          {options.performance.map((option) => (
            <Radio
              key={"performance-"+option.value}
              value={option.value}
              paddingRight="10px"
              disabled={rest.disabled}
            >
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </Box>
    </Flex>
  );
}
