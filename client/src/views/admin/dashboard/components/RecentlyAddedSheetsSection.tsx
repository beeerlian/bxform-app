import { useQuery } from "@apollo/client";
import {
  CircularProgress,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import FormSheetCard from "components/card/FormSheetCard";
import { FORM_QUERIES } from "services/apollo/Operations/Client/Queries";
import { FormListProps } from "types/dto-types";
import { Forms } from "__generated__/graphql";

export default function RecentlyAddedSheetsSection({
  arg,
}: {
  arg: FormListProps;
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const { data, loading, error } = useQuery<{ forms: Forms[] }>(
    FORM_QUERIES.getList(arg)
  );
  return (
    <Flex direction="column">
      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <CircularProgress isIndeterminate color="brand.500" />
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" h="200px">
          <Text color="red.500">{error.message}</Text>
        </Flex>
      ) : data ? (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
          {data.forms.map((form: Forms) => (
            <FormSheetCard form={form} />
          ))}
        </SimpleGrid>
      ) : null}
    </Flex>
  );
}
