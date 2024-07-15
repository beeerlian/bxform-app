// Chakra imports
import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import FormSettingTab from "./components/FormSettingTab";
// Assets
// Custom components

export default function FormDetail() {
  // Chakra Color Mode

  // Chakra Color Mode
  const primaryColor = useColorModeValue("navy", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Tabs mt="45px" colorScheme={primaryColor}>
          <TabList>
            <Tab fontWeight="bold">Questions</Tab>
            <Tab fontWeight="bold">Responses</Tab>
            <Tab fontWeight="bold">Analytic</Tab>
            <Tab fontWeight="bold">Setting</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="3px"
            bg={primaryColor}
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel>
              <FormSettingTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      {/* Delete Product */}
    </Box>
  );
}
