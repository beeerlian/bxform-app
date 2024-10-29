// Chakra imports
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FORM_QUERIES } from "services/apollo/Operations/Client/Queries";
import { Questions } from "__generated__/graphql";
import CreateFormSettingTab from "./components/CreateFormSettingTab";
import CreateQuestionTab from "./components/CreateQuestionTab";

// Custom components

export default function CreateForm() {
  const primaryColor = useColorModeValue("navy", "white");
  const mainText = useColorModeValue("navy.700", "white");
  

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex flexDirection="column">
        <Text color={mainText} fontWeight="bold" fontSize="34px">
          Buat Form Baru
        </Text>
        <Tabs mt="45px" colorScheme={primaryColor}>
          <TabList>
            <Tab fontWeight="bold">Questions</Tab>
            <Tab fontWeight="bold">Setting</Tab>
          </TabList>
          <TabIndicator height="3px" bg={primaryColor} borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <CreateQuestionTab />
            </TabPanel>
            <TabPanel>
              <CreateFormSettingTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
}
