import { Input } from "@chakra-ui/react";
import { Questions } from "__generated__/graphql";

export default function EssaiInput({
  question,
  ...props
}: {
  question: Questions;
  [x: string]: any;
}) {
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
